import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../../Context/ThemeContext";

const TicketSelectionPage = ({ ticket }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { theme } = useDarkTheme();

  if (!ticket) {
    return <p>Kein Ticket ausgewählt.</p>;
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = ticket.price * quantity;

  const handleAddToCart = () => {
    // Here you can add logic to add the ticket to the cart
    console.log("Ticket added to cart:", { ticket, quantity });
    navigate("/cart", { state: { ticket, quantity, totalPrice } });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  return (
    <div
      className={`flex flex-col items-center mt-3 min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`relative flex flex-col items-center justify-center w-full pt-5 rounded-lg ${
          theme === "light" ? "bg-gray-300" : "bg-gray-700"
        }`}
      >
        <img
          src={ticket.image}
          alt={ticket.title}
          className="h-44 w-96 object-contain"
        />
        <div className="text-center">
          <h2
            className={`font-extrabold text-lg mt-1 ${
              theme === "light" ? "text-orange-800" : "text-orange-500"
            }`}
          >
            {ticket.title}
          </h2>
          <p
            className={`text-md mt-6 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {ticket.eventLocation}
            {" -"}
            <span
              className={`mt-1 text-sm italic ${
                theme === "light" ? "text-black" : "text-gray-300"
              }`}
            >
              {ticket.city}
            </span>
          </p>
          <div
            className={`text-md my-6 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <p className="mt-1">{formatDate(ticket.date)}</p>
            <p
              className={`mt-1 ${
                theme === "light" ? "text-red-900" : "text-red-500"
              }`}
            >
              {ticket.startTime} - {ticket.endTime}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <button
          onClick={handleDecrease}
          className={`px-4 py-2 ${
            theme === "light" ? "bg-gray-300" : "bg-gray-700"
          } text-${theme === "light" ? "black" : "white"}`}
        >
          -
        </button>
        <p className={`mx-4 text-${theme === "light" ? "black" : "white"}`}>
          {quantity}
        </p>
        <button
          onClick={handleIncrease}
          className={`px-4 py-2 ${
            theme === "light" ? "bg-gray-300" : "bg-gray-700"
          } text-${theme === "light" ? "black" : "white"}`}
        >
          +
        </button>
      </div>
      <div
        className={`relative flex items-center justify-between w-full rounded-lg p-1 my-8 border-b-4 ${
          theme === "light" ? "border-orange-500" : "border-orange-700"
        }`}
      >
        <p
          className={`text-xl text-end uppercase font-bold ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Total:
        </p>
        <p
          className={`text-2xl ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {ticket.currency} {totalPrice.toFixed(2)}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className={`mt-4 px-4 py-2 rounded ${
          theme === "light"
            ? "bg-orange-500 text-white"
            : "bg-orange-700 text-white"
        } hover:bg-${theme === "light" ? "orange-600" : "orange-800"}`}
      >
        In den Warenkorb
      </button>
    </div>
  );
};

export default TicketSelectionPage;
