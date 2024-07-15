// src/api/search.js
import axios from "axios";

export const fetchSearchResults = async (query) => {
  const eventResponse = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/dashboard/event`
  );
  const ticketResponse = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/dashboard/tickets`
  );

  const filteredEvents = eventResponse.data.filter((event) =>
    event.titel.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTickets = ticketResponse.data.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(query.toLowerCase()) ||
      (ticket.artist &&
        ticket.artist.toLowerCase().includes(query.toLowerCase()))
  );

  return {
    events: filteredEvents,
    tickets: filteredTickets,
  };
};
