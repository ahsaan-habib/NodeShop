const express = require("express");
const router = express.Router();
const {
  createCharge,
  handleWebhook,
} = require("../controllers/paymentController.js");

router.route("/create-charge").post(createCharge);
router.route("/webhook").post(handleWebhook);

module.exports = router;
