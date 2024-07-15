import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com"; // Import von emailjs-com
import { useAuthContext } from "../../hooks/useAuthContext";
import SearchComponent from "../Search/SearchComponent";
import { BsCartXFill } from "react-icons/bs";
import { useDarkTheme } from "../../Context/ThemeContext";

const Warenkorb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket, quantity, totalPrice } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // State for userId
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const { theme } = useDarkTheme();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.email) {
        setEmail(user.email);
      }
      if (user._id) {
        setUserId(user._id);
      }
    }
  }, []);

  if (!ticket) {
    return (
      <div className="container mx-auto text-center mt-20 h-96">
        <div className="flex justify-center items-center mb-4 mt-64">
          <div className="text-6xl">
            <BsCartXFill />
          </div>
          <p className="text-lg font-semibold ml-4">Warenkorb ist leer.</p>
        </div>
        <div className="w-60 container mx-auto py-12">
          <SearchComponent />
        </div>
      </div>
    );
  }
  console.log(ticket);

  const sendEmail = () => {
    const templateParams = {
      to_email: user.email,
      from_name: "EVENTHUB", // Absendername
      to_name: user.name, // Empfängername
      subject: "Bestellbestätigung", // Betreff der E-Mail
      message: `
        
        Hallo ${user.name},
        Vielen Dank für deinen Einkauf!
        Hier ist eine Zusammenfassung deiner Bestellung:
        Ticket: ${ticket.title}
        Künstler: ${ticket.artist}
        Datum: ${ticket.date}
        Ort: ${ticket.eventLocation}
        Anzahl: ${quantity}
        Gesamtpreis: ${totalPrice.toFixed(2)} €
        Verwendungszweck: ${ticket._id}
      
        BITTE ÜBERWEISUNGEN AN DIE FOLGENDE BANKVERBINDUNG:
        Paypal-Email Adresse: finalproject218@gmail.com
        Name: EVENTHUB GMBH
        Konto: 123456789
        BLZ: 12345678
        Bank: Musterbank
        IBAN: DE123456789123456789
        BIC: ABCDEFGH
        
        Bei Fragen stehen wir dir gerne zur Verfügung.
        Herzliche Grüße, EVENTHUB
      `, // Inhalt der E-Mail
    };

    // Verwendung von emailjs zum Senden der E-Mail
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_USER_ID
      )
      .then(
        (response) => {
          console.log(
            "E-Mail erfolgreich gesendet:",
            response.status,
            response.text
          );
        },
        (error) => {
          console.error("Fehler beim Senden der E-Mail:", error);
        }
      );
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        artist: ticket.artist,
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        ticketimg: ticket.image,
        ticketlocation: ticket.eventLocation,
        ticketdate: ticket.date,
        ticketstarttime: ticket.startTime,
        ticketendtime: ticket.endTime,
        quantity,
        totalPrice,
        email,
        paymentMethod,
        user_id: user.userId, // Add user_id to orderData
      };

      console.log("Order Data:", orderData); // Debugging output

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/`,
        orderData
      );
      console.log("Bestellung erfolgreich:", response.data);

      // E-Mail senden
      sendEmail();

      navigate("/success", {
        state: {
          ticket,
          quantity,
          totalPrice,
          artist: ticket.artist,
          date: ticket.date,
          location: ticket.eventLocation,
          startTime: ticket.startTime,
          endTime: ticket.endTime,
          image: ticket.image,
        },
      }); // or redirect to a confirmation page
    } catch (error) {
      console.error("Fehler beim Checkout:", error);
      if (error.response) {
        setError(error.response.data.message || "Fehler beim Checkout.");
      } else {
        setError("Fehler beim Checkout.");
      }
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`shadow-md rounded p-6 mt-6 w-full max-w-lg ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-auto rounded-md"
        />
        <h2
          className={`text-xl font-bold mt-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {ticket.title}
        </h2>
        <p className={`${theme === "light" ? "text-black" : "text-gray-300"}`}>
          {ticket.eventLocation}
        </p>
        <p className={`${theme === "light" ? "text-black" : "text-gray-300"}`}>
          {ticket.date}
        </p>
        <p className={`${theme === "light" ? "text-black" : "text-gray-300"}`}>
          {ticket.city}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p
            className={`text-lg ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Anzahl: {quantity}
          </p>
          <p
            className={`text-lg ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Preis: {ticket.currency} {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <div
        className={`shadow-md rounded p-6 mt-6 w-full max-w-lg ml-0 md:ml-6 ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Zahlungsdetails
        </h2>
        <div>
          <label
            className={`block mb-2 ${
              theme === "light" ? "text-black" : "text-gray-300"
            }`}
          >
            E-Mail:
          </label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded ${
              theme === "light" ? "border-gray-300" : "border-gray-600"
            } ${theme === "light" ? "bg-white" : "bg-gray-700"} ${
              theme === "light" ? "text-black" : "text-white"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label
          className={`block mb-2 mt-4 ${
            theme === "light" ? "text-black" : "text-gray-300"
          }`}
        >
          Zahlungsmethode:
        </label>
        <select
          className={`block w-full p-2 border rounded mb-4 ${
            theme === "light" ? "border-gray-300" : "border-gray-600"
          } ${theme === "light" ? "bg-white" : "bg-gray-700"} ${
            theme === "light" ? "text-black" : "text-white"
          }`}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Bitte auswählen</option>
          <option value="Paypal">PayPal</option>
          <option value="Klarna">Klarna</option>
          <option value="Rechnung">Rechnung</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Zahlungspflichtig bestellen
        </button>
      </div>
    </div>
  );
};

export default Warenkorb;
