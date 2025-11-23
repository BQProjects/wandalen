// Quick smoke-test script for trial/end date logic
// Run: node scripts/test_trial_end_logic.js

const MS_DAY = 24 * 60 * 60 * 1000;

function computeTrialEndFromSubscription(subscription, now = new Date()) {
  // subscription: object possibly containing trial_end and current_period_end (seconds)
  let trialEnd;

  if (subscription.trial_end && !isNaN(subscription.trial_end)) {
    trialEnd = new Date(subscription.trial_end * 1000);
  } else if (
    subscription.current_period_end &&
    !isNaN(subscription.current_period_end)
  ) {
    trialEnd = new Date(subscription.current_period_end * 1000 + MS_DAY);
  } else {
    trialEnd = new Date(now.getTime() + 7 * MS_DAY);
  }

  return trialEnd;
}

function formatResult(name, sub) {
  const res = computeTrialEndFromSubscription(sub);
  console.log(`---- ${name} ----`);
  console.log("subscription:", JSON.stringify(sub));
  console.log(
    "trialEnd =>",
    res.toISOString(),
    "(local:",
    res.toLocaleString(),
    ")"
  );
  console.log();
}

// 1) subscription with trial_end provided
const now = new Date();
const trialEndTs = Math.floor((now.getTime() + 3 * MS_DAY) / 1000); // 3 days from now in seconds
formatResult("with trial_end", { trial_end: trialEndTs });

// 2) subscription missing trial_end but has current_period_end
const currentPeriodEndTs = Math.floor((now.getTime() + 10 * MS_DAY) / 1000); // 10 days from now
formatResult("with current_period_end only", {
  current_period_end: currentPeriodEndTs,
});

// 3) missing both
formatResult("missing both", {});

console.log("Smoke test complete.");
