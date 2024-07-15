const Order = require("../Models/orderSchema");
const dotenv = require("dotenv");

exports.createOrder = async (req, res) => {
  try {
    const {
      ticketId,
      ticketTitle,
      ticketimg,
      ticketlocation,
      ticketdate,
      ticketstarttime,
      ticketendtime,
      artist,
      quantity,
      totalPrice,
      email,
      paymentMethod,
      user_id,
    } = req.body;

    console.log("Received order data:", req.body);

    if (
      !ticketId ||
      !ticketTitle ||
      !ticketimg ||
      !ticketlocation ||
      !ticketdate ||
      !ticketstarttime ||
      !ticketendtime ||
      !artist ||
      !quantity ||
      !totalPrice ||
      !email ||
      !paymentMethod ||
      !user_id
    ) {
      return res
        .status(400)
        .json({ message: "Alle Felder sind erforderlich." });
    }

    const newOrder = new Order({
      ticketId,
      ticketTitle,
      ticketimg,
      ticketlocation,
      ticketdate,
      ticketstarttime,
      ticketendtime,
      artist,
      quantity,
      totalPrice,
      email,
      paymentMethod,
      user_id,
    });

    await newOrder.save();

    res.status(200).json({ message: "Bestellung erfolgreich!" });
  } catch (error) {
    console.error("Fehler beim Speichern der Bestellung:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Bestellung." });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fehler beim Abrufen der Bestellungen:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Bestellungen." });
  }
};
