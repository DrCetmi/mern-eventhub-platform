import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketBox from "../../Components/Tickets/TicketBox";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import TicketSelectionPage from "../../Components/Tickets/TicketSelectionPage";
import { useDarkTheme } from "../../Context/ThemeContext";

const EventDetails = ({ dateString }) => {
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useDarkTheme();

  const date = new Date(dateString);
  const year = date.toLocaleDateString("de-DE", { year: "numeric" });
  const month = date.toLocaleDateString("de-DE", { month: "long" });
  const day = date.toLocaleDateString("de-DE", { day: "numeric" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        const eventRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/event/${id}`
        );
        const eventData = eventRes.data;
        setEvent(eventData);

        const ticketsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/tickets/`
        );
        const allTickets = ticketsRes.data;

        if (!eventData.titel) {
          setLoading(false);
          return;
        }

        const eventTitle = eventData.titel.trim().toLowerCase();
        const filteredTickets = allTickets.filter((ticket) => {
          if (!ticket.artist) {
            return false;
          }
          const ticketArtist = ticket.artist.trim().toLowerCase();
          return eventTitle.includes(ticketArtist);
        });

        setTickets(filteredTickets);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventAndTickets();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  const getWeekDay = (dateString) => {
    const options = { weekday: "long" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  const getWeekOfYear = (dateString) => {
    const date = new Date(dateString);
    const start = new Date(date.getFullYear(), 0, 1);
    const diff =
      (date -
        start +
        (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) /
      86400000;
    return Math.ceil((diff + start.getDay() + 1) / 7);
  };

  const getMonth = (dateString) => {
    const options = { month: "long" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  const getYear = (dateString) => {
    const options = { year: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Event not found.</p>
      </div>
    );
  }

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div
      className={`flex flex-col items-center justify-start min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      } container mx-auto text-center`}
    >
      <div
        className={`relative lg:flex sm:flex-col items-center justify-start w-full font-extrabold ${
          theme === "light" ? "bg-blue-gray-700" : "bg-blue-gray-900"
        } container mx-auto`}
      >
        <img
          src={event.headerUrl}
          alt={event.titel}
          className="h-full w-full lg:object-cover"
        />
        <div className="lg:absolute sm:relative top-0 lg:w-full h-full flex items-center justify-start p-4 sm:left-0 italic bg-opacity-25 bg-black">
          <div className="lg:ml-16 md:ml-5 sm:mt-5 lg:mt-1">
            <h2
              className={`font-extrabold sm:mb-1 lg:m-6 ${
                theme === "light"
                  ? "lg:text-white sm:text-black"
                  : "lg:text-white sm:text-white"
              }`}
            >
              {event.titel}
            </h2>
            <p
              className={`lg:text-white sm:mb-1 lg:m-6 ${
                theme === "light"
                  ? "lg:text-white sm:text-black"
                  : "lg:text-white sm:text-white"
              }`}
            >
              {event.beschreibung}
            </p>
            <div
              className={`lg:text-white sm:text-black sm:mb-3 lg:m-6 text-xs ${
                theme === "light" ? "text-white" : "text-white"
              }`}
            >
              <p className="mt-3">
                {formatDate(event.startDatum)} - {formatDate(event.endDatum)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TicketBox />
      {tickets.length > 0 ? (
        <div className="grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-6 border-red-300">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className={`max-w-md mx-auto rounded-xl shadow-1xl overflow-hidden md:max-w-4xl mb-4 border-2 md:w-full w-56 ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <div className="md:flex ">
                <div className="md:shrink-0">
                  <img
                    className="object-cover md:w-52 md:h-full"
                    src={ticket.image || ticketImage} // Use ticket image if available, otherwise use event header
                    alt="Ticket image"
                  />
                </div>
                <div className="p-8 flex-grow md:flex justify-around">
                  <div>
                    <p
                      className={`text-3xl font-bold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      {ticket.city}
                    </p>
                    <p className="mt-2 text-slate-500">
                      <span className="font-bold ">
                        <p className="text-orange-700 text-2xl">
                          {getWeekDay(ticket.date)}{" "}
                          <span
                            className={`mt-2 text-slate-500 text-orange-500 text-xl`}
                          >
                            {new Date(ticket.date).toLocaleDateString("de-DE")}
                          </span>
                        </p>
                      </span>
                    </p>
                    <p
                      className={`mt-2 text-xl ${
                        theme === "light" ? "text-slate-500" : "text-gray-200"
                      }`}
                    >
                      {ticket.title}
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      {ticket.eventLocation}
                    </p>
                  </div>

                  <div className="md:flex justify-center md:justify-center mt-4">
                    <div className="md:flex md:items-center md:justify-center">
                      <div className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-8 flex items-center justify-center hover:bg-gray-200 mx-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-8 flex items-center justify-center hover:bg-gray-200 mx-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                          />
                        </svg>
                      </div>

                      <div>
                        <div className="flex justify-center">
                          <p className="mx-1 py-2">ab {ticket.currency}</p>
                          <p className="mx-1 py-2"> {ticket.price}</p>
                        </div>
                        <button
                          onClick={() => handleTicketClick(ticket)}
                          className="bg-orange-500 text-white px-10 py-1 rounded-xl hover:bg-orange-900"
                        >
                          Ticket
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">
          No tickets available for this event.
        </p>
      )}
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        placement="right"
        className={`p-4 ${
          theme === "light" ? "bg-blue-gray-100" : "bg-blue-gray-900"
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

export default EventDetails;
