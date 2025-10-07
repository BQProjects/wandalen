const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId, email } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify the session belongs to the correct email
    if (session.customer_details?.email !== email) {
      return res.status(400).json({
        success: false,
        message: "Email mismatch",
      });
    }

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
        paymentStatus: session.payment_status,
      });
    }

    // Return success with customer details
    res.json({
      success: true,
      paymentStatus: session.payment_status,
      customerId: session.customer,
      subscriptionId: session.subscription,
      customerEmail: session.customer_details.email,
      amountTotal: session.amount_total,
      currency: session.currency,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error verifying Stripe payment:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

module.exports = {
  verifyStripePayment,
};
