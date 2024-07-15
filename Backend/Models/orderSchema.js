const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  ticketTitle: { type: String, required: true },
  ticketimg: { type: String, required: true },
  ticketlocation: { type: String, required: true },
  ticketdate: { type: String, required: true },
  ticketstarttime: { type: String, required: true },
  ticketendtime: { type: String, required: true },
  artist: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  email: { type: String, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Paypal", "Klarna", "Rechnung"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
