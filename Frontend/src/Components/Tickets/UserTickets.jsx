import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import QRCode from "qrcode.react";

const formatPrice = (price, decimals) => {
  return parseFloat(price).toFixed(decimals);
};

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/`
        );
        setTickets(res.data);
        setLoading(false);
        // console.log("Tickets:", res.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Tickets:", error);
        setError("Fehler beim Abrufen der Tickets.");
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate.toUpperCase();
  };

  const generateRandomNumber = () => {
    const digits = "A0B1C2D3E4F5G6H7I8J9K1L2M3N4OPQRSTUVWXY";
    let randomNumber = "";
    for (let i = 0; i < 16; i++) {
      randomNumber += digits[Math.floor(Math.random() * 10)];
    }
    return randomNumber;
  };

  if (loading) {
    return <p>Lade Tickets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Sort tickets by date in descending order
  const sortedTickets = tickets.sort(
    (a, b) => new Date(b.ticketdate) - new Date(a.ticketdate)
  );

  const filteredTickets = sortedTickets.filter(
    (ticket) => ticket.user_id === user.userId
  );

  return (
    <div className="flex flex-wrap justify-center p-4">
      {filteredTickets.map((ticket, index) => {
        const randomNumber = generateRandomNumber();
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg m-4 border border-gray-300"
          >
            <div className="w-full md:w-1/4 flex justify-center items-center bg-gray-100 p-4 border-b-gray-500 border-4 border-dotted border-l-0 border-t-0 md:border-r-gray-500 md:border-4 md:border-dotted md:border-b-0 ">
              <img
                src={ticket.ticketimg}
                alt={ticket.artist}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/4 p-5 flex flex-col justify-between">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {ticket.artist}
              </h1>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">DATE</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {formatDate(ticket.ticketdate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">TIME</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {ticket.ticketstarttime}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{ticket.venue}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">LOCATION</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {ticket.ticketlocation}
                  </p>
                </div>
                <div>
                  <p>EURO</p>
                  <p className="text-2xl font-semibold ">
                    {formatPrice(ticket.totalPrice, 2)} €
                  </p>
                  <p className="">
                    <span className=""> Ticket Anzahl</span>
                    <span className="font-bold text-2xl text-orange-500">
                      {" "}
                      {ticket.quantity}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 flex flex-col justify-center items-center bg-gray-100 p-4 border-t-gray-500 border-4 border-dotted border-r-0 border-b-0 border-l-0 md:border-l-gray-500 md:border-4 md:border-dotted md:border-r-0 md:border-b-0 md:border-t-0 ">
              <QRCode value={randomNumber} />
              <p className="mt-4">{randomNumber}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserTickets;
