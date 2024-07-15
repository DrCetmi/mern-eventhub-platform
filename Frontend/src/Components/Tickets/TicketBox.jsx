import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkTheme } from "../../Context/ThemeContext";

const TicketBox = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [ticketTypeFilter, setTicketTypeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Zustand für das Anzeigen/Verstecken der Filter
  const [teddyTickets, setTeddyTickets] = useState([]);
  const { theme } = useDarkTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      formattedDate: date
        .toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toUpperCase(),
      weekday: date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase(),
      month: date.toLocaleDateString("en-US", { month: "long" }).toUpperCase(),
      day: date.toLocaleDateString("en-US", { day: "numeric" }).toUpperCase(),
      year: date.toLocaleDateString("en-US", { year: "numeric" }).toUpperCase(),
    };
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/tickets/`
        );
        setTickets(res.data);
        setFilteredTickets(res.data); // Initialize filteredTickets with all tickets
      } catch (error) {
        console.error("Fehler beim Abrufen der Tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    setTeddyTickets(
      filteredTickets.filter(
        (ticket) => ticket.artist === "Teddy" || ticket.artist === "Teddy 2025"
      )
    );
    console.log(teddyTickets);
  }, []);

  console.log(teddyTickets);

  // Filter function
  const applyFilters = () => {
    let filtered = tickets.filter((ticket) => {
      // Filter by city
      if (cityFilter && ticket.city !== cityFilter) {
        return false;
      }
      // Filter by ticket type
      if (ticketTypeFilter && ticket.ticketType !== ticketTypeFilter) {
        return false;
      }
      return true;
    });
    setFilteredTickets(filtered);
  };

  // Handle city filter change
  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };

  // Handle ticket type filter change
  const handleTicketTypeChange = (e) => {
    setTicketTypeFilter(e.target.value);
  };

  // Toggle function for showing/hiding filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [cityFilter, ticketTypeFilter]); // Reapply filters when cityFilter or ticketTypeFilter changes

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-gray-800"
      } p-4 rounded-lg`}
    >
      {/* Filter toggle button */}
      <button
        onClick={toggleFilters}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-2 my-5"
      >
        {showFilters ? (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <p>Filter</p>
          </div>
        ) : (
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <p>Filter anzeigen</p>
          </div>
        )}
      </button>
      {/* Filter section */}
      {showFilters && (
        <div
          className={`filter-container flex flex-wrap gap-4 items-center my-5 rounded-md justify-between p-2 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <label htmlFor="city-filter" className="mr-2">
            Stadt: {cityFilter}
          </label>
          <select
            id="city-filter"
            onChange={handleCityChange}
            value={cityFilter}
            className={`border rounded-md py-2 px-4 focus:outline-none focus:ring-2 ${
              theme === "light"
                ? "border-gray-300 focus:ring-blue-200 focus:border-blue-300"
                : "border-gray-600 focus:ring-blue-700 focus:border-blue-700"
            } ${theme === "light" ? "bg-white" : "bg-gray-800"} ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <option value="">Alle</option>
            <option value="Berlin">Berlin</option>
            <option value="Hamburg">Hamburg</option>
            <option value="München">München</option>
            <option value="Köln">Köln</option>
            <option value="Frankfurt">Frankfurt</option>
            <option value="Leipzig">Leipzig</option>
            <option value="Bremen">Bremen</option>
            <option value="Hannover">Hannover</option>
            <option value="Stuttgart">Stuttgart</option>
            <option value="Koblenz">Koblenz</option>
            <option value="Mainz">Mainz</option>
            <option value="Wiesbaden">Wiesbaden</option>
            <option value="Mannheim">Mannheim</option>
            {/* Add more cities as needed */}
          </select>
          <label htmlFor="ticket-type-filter" className="mr-2">
            Ticketart:
          </label>
          <select
            id="ticket-type-filter"
            onChange={handleTicketTypeChange}
            value={ticketTypeFilter}
            className={`border rounded-md py-2 px-4 focus:outline-none focus:ring-2 ${
              theme === "light"
                ? "border-gray-300 focus:ring-blue-200 focus:border-blue-300"
                : "border-gray-600 focus:ring-blue-700 focus:border-blue-700"
            } ${theme === "light" ? "bg-white" : "bg-gray-800"} ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <option value="">Alle</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            {/* Add more ticket types as needed */}
          </select>
        </div>
      )}
    </div>
  );
};

export default TicketBox;
