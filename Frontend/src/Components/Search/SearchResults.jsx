import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSearchResults } from "./SearchApi";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import TicketSelectionPage from "../Tickets/TicketSelectionPage";
import { useDarkTheme } from "../../Context/ThemeContext";

const Search = () => {
  const [results, setResults] = useState({ events: [], tickets: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useDarkTheme();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetchSearchResults(query).then((data) => setResults(data));
    }
  }, [location]);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-4 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Search Results
      </h1>
      <div className="w-full p-2 ">
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Events
        </h2>
        <div
          className={`flex flex-col space-y-4 p-4 ${
            theme === "light" ? "bg-blue-gray-100" : "bg-gray-800"
          }`}
        >
          {results.events.length > 0 ? (
            results.events.map((event) => (
              <div
                key={event._id}
                className={`flex flex-col sm:flex-row items-center shadow-lg rounded-lg overflow-hidden ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                <img
                  className="w-full sm:w-1/6 object-cover h-48 object-top sm:h-auto"
                  src={event.bild}
                  alt={event.titel}
                />
                <div className="w-full sm:w-4/6 p-4">
                  <h2
                    className={`text-lg font-bold ${
                      theme === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    {event.titel}
                  </h2>
                  <p
                    className={`truncate ${
                      theme === "light" ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {event.beschreibung}
                  </p>
                  <p
                    className={`${
                      theme === "light" ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {formatDate(event.startDatum)}
                  </p>
                </div>
                <div className="w-full sm:w-1/6 p-4 flex justify-center sm:justify-end">
                  <button
                    onClick={() => handleEventClick(event._id)}
                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                  >
                    Zu den Tickets
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={`${theme === "light" ? "text-black" : "text-white"}`}>
              Keine Events gefunden.
            </p>
          )}
        </div>
      </div>
      <div className="w-full p-2 mt-8">
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Tickets
        </h2>
        <div
          className={`flex flex-col space-y-4 p-4 ${
            theme === "light" ? "bg-blue-gray-100" : "bg-gray-800"
          }`}
        >
          {results.tickets.length > 0 ? (
            results.tickets.map((ticket) => (
              <div
                key={ticket._id}
                className={`flex flex-col sm:flex-row items-center shadow-lg rounded-lg overflow-hidden ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                <div className="w-full sm:w-1/6 flex justify-center p-4">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="h-32 sm:h-auto object-cover object-top"
                  />
                </div>
                <div className="w-full sm:w-4/6 p-4">
                  <h3
                    className={`text-lg font-bold ${
                      theme === "light" ? "text-orange-800" : "text-orange-500"
                    }`}
                  >
                    {ticket.title}
                  </h3>
                  <p
                    className={`truncate ${
                      theme === "light" ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {ticket.eventLocation} - {ticket.city}
                  </p>
                  <p
                    className={`${
                      theme === "light" ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {formatDate(ticket.date)}
                  </p>
                  <p
                    className={`${
                      theme === "light" ? "text-red-900" : "text-red-500"
                    }`}
                  >
                    {ticket.startTime} - {ticket.endTime}
                  </p>
                </div>
                <div className="w-full sm:w-1/6 p-4 flex justify-center sm:justify-end">
                  <button
                    onClick={() => handleTicketClick(ticket)}
                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={`${theme === "light" ? "text-black" : "text-white"}`}>
              No tickets available.
            </p>
          )}
        </div>
      </div>
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        placement="right"
        className={`p-4 ${
          theme === "light" ? "bg-blue-gray-100" : "bg-gray-900"
        }`}
        overlayProps={{ className: "backdrop-filter-none bg-transparent" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Ticket Selection
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {selectedTicket && <TicketSelectionPage ticket={selectedTicket} />}
      </Drawer>
    </div>
  );
};

export default Search;
