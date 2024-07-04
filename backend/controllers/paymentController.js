const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Payment = require("../models/paymentModel.js");
const Order = require("../models/orderModel.js");
const crypto = require("crypto");

// Create a new charge
const createCharge = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  try {
    const { data } = await axios.post(
      "https://api.commerce.coinbase.com/charges",
      {
        name: "Order Payment",
        description: `Payment for order ${orderId}`,
        pricing_type: "fixed_price",
        local_price: {
          amount: order.totalPrice.toFixed(2),
          currency: "INR",
        },
        metadata: {
          order_id: orderId,
          customer_id: order.user,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CC-Api-Key": process.env.COINBASE_API_KEY,
          "X-CC-Version": "2018-03-22",
        },
      }
    );

    const payment = new Payment({
      order: orderId,
      paymentGateway: "Coinbase",
      paymentId: data.data.code,
      status: "pending",
      amount: order.totalPrice,
      currency: "USD",
    });

    await payment.save();

    res.json(data);
  } catch (error) {
    res.status(500);
    throw new Error(error.response ? error.response.data : error.message);
  }
});

// Handle webhook events
const handleWebhook = asyncHandler(async (req, res) => {
  const rawBody = JSON.stringify(req.body);
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;

  const hmac = crypto.createHmac("sha256", webhookSecret);
  hmac.update(rawBody);
  const hash = hmac.digest("hex");

  if (hash !== signature) {
    res.status(400);
    throw new Error("Invalid webhook signature");
  }

  const event = req.body.event;
  const charge = req.body.data;

  if (event === "charge:confirmed") {
    const payment = await Payment.findOne({ paymentId: charge.code });
    if (payment) {
      payment.status = "confirmed";
      payment.updatedAt = Date.now();

      await payment.save();

      const order = await Order.findById(payment.order);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: charge.id,
          status: "confirmed",
          update_time: charge.updated_at,
          email_address: charge.customer_email,
        };

        await order.save();
      }
    }
  }

  res.sendStatus(200);
});

module.exports = {
  createCharge,
  handleWebhook,
};
