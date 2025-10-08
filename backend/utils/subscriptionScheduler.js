const cron = require("node-cron");
const ClientModel = require("../models/clientModel");
const { checkAndExtendSubscription } = require("../components/client");
const mongoose = require("mongoose");

// Lock to prevent concurrent runs
let isRunning = false;
const MAX_RETRIES = 3;
const BATCH_SIZE = 10; // Process in small batches
const STRIPE_RATE_LIMIT_DELAY = 100; // 100ms between Stripe calls

// Sleep function for rate limiting
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Process subscriptions in batches with error handling
const processSubscriptionBatch = async (subscriptions, batchStart = 0) => {
  const batch = subscriptions.slice(batchStart, batchStart + BATCH_SIZE);
  const results = { processed: 0, renewed: 0, errors: 0 };

  for (const client of batch) {
    try {
      // Rate limit Stripe API calls
      await sleep(STRIPE_RATE_LIMIT_DELAY);

      const renewalResult = await checkAndExtendSubscription(client);

      if (renewalResult.renewed) {
        results.renewed++;
        console.log(`✅ Renewed subscription for ${client.email}`);
      }

      results.processed++;
    } catch (error) {
      console.error(
        `❌ Error processing subscription for ${client.email}:`,
        error.message
      );
      results.errors++;

      // Continue processing other subscriptions even if one fails
    }
  }

  return results;
};

// Main renewal check function with comprehensive error handling
const checkAllSubscriptionsForRenewal = async () => {
  if (isRunning) {
    console.log("⏳ Subscription renewal check already running, skipping...");
    return { skipped: true, reason: "Already running" };
  }

  isRunning = true;
  let session = null;

  try {
    console.log("🚀 Starting subscription renewal check...");

    // Start MongoDB transaction for consistency
    session = await mongoose.startSession();
    session.startTransaction();

    // Find subscriptions that need checking (active, not cancelled, expiring within 7 days)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const subscriptionsToCheck = await ClientModel.find({
      subscriptionStatus: { $in: ["active", "trial"] },
      endDate: { $lte: sevenDaysFromNow },
      stripeSubscriptionId: { $exists: true, $ne: null },
    }).session(session);

    console.log(
      `📊 Found ${subscriptionsToCheck.length} subscriptions to check`
    );

    if (subscriptionsToCheck.length === 0) {
      await session.abortTransaction();
      return { checked: 0, renewed: 0, errors: 0 };
    }

    // Process in batches to avoid overwhelming Stripe API
    let totalResults = { processed: 0, renewed: 0, errors: 0 };
    let batchStart = 0;

    while (batchStart < subscriptionsToCheck.length) {
      console.log(
        `🔄 Processing batch ${Math.floor(batchStart / BATCH_SIZE) + 1}...`
      );

      const batchResults = await processSubscriptionBatch(
        subscriptionsToCheck,
        batchStart
      );

      totalResults.processed += batchResults.processed;
      totalResults.renewed += batchResults.renewed;
      totalResults.errors += batchResults.errors;

      batchStart += BATCH_SIZE;
    }

    // Commit transaction
    await session.commitTransaction();

    console.log(
      `✅ Renewal check completed: ${totalResults.processed} processed, ${totalResults.renewed} renewed, ${totalResults.errors} errors`
    );

    return totalResults;
  } catch (error) {
    console.error("💥 Critical error in subscription renewal check:", error);

    // Rollback transaction on error
    if (session) {
      try {
        await session.abortTransaction();
      } catch (rollbackError) {
        console.error("❌ Error rolling back transaction:", rollbackError);
      }
    }

    throw error;
  } finally {
    if (session) {
      session.endSession();
    }
    isRunning = false;
  }
};

// Retry wrapper for resilience
const retryOperation = async (operation, maxRetries = MAX_RETRIES) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.warn(
        `⚠️ Attempt ${attempt}/${maxRetries} failed:`,
        error.message
      );

      if (attempt === maxRetries) {
        throw new Error(
          `Operation failed after ${maxRetries} attempts: ${error.message}`
        );
      }

      // Exponential backoff
      await sleep(Math.pow(2, attempt) * 1000);
    }
  }
};

// Schedule daily renewal check at 2 AM
const scheduleSubscriptionRenewalCheck = () => {
  console.log("📅 Scheduling subscription renewal checks...");

  // Daily check at 2:00 AM
  cron.schedule("0 2 * * *", async () => {
    console.log("⏰ Running scheduled subscription renewal check...");

    try {
      await retryOperation(checkAllSubscriptionsForRenewal);
    } catch (error) {
      console.error("💥 Scheduled renewal check failed:", error);
      // In production, send alert to monitoring system
    }
  });


  console.log("✅ Subscription renewal scheduler initialized");
};

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully...");
  isRunning = false;
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully...");
  isRunning = false;
  process.exit(0);
});

module.exports = {
  scheduleSubscriptionRenewalCheck,
  checkAllSubscriptionsForRenewal,
  processSubscriptionBatch,
};
