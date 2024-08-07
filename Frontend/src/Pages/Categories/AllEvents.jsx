import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import { useDarkTheme } from "../../Context/ThemeContext";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedCity, setSelectedCity] = useState("Alle");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const eventsPerPage = 10; // Anzahl der Events pro Seite
  const { theme } = useDarkTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/event`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Zurück zur ersten Seite bei Kategorienwechsel
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setCurrentPage(1); // Zurück zur ersten Seite bei Städtewechsel
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1); // Zurück zur ersten Seite bei Datumwechsel
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setCurrentPage(1); // Zurück zur ersten Seite bei Datumwechsel
  };

  const resetFilters = () => {
    setSelectedCategory("Alle");
    setSelectedCity("Alle");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  // Filtern der Events nach Kategorie, Stadt und Datum
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startDatum);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const isCategoryMatch =
      selectedCategory === "Alle" || event.kategorie === selectedCategory;
    const isCityMatch =
      selectedCity === "Alle" || event.ort.stadt === selectedCity;
    const isStartDateMatch = !start || eventDate >= start;
    const isEndDateMatch = !end || eventDate <= end;

    return isCategoryMatch && isCityMatch && isStartDateMatch && isEndDateMatch;
  });

  // Berechnen der aktuellen Events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Seitenwechsel-Funktion
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Berechnen der Gesamtseitenanzahl
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className={`flex flex-col ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      {/* Filter Dropdown */}
      <div className="flex flex-wrap justify-center my-4">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className={`border text-sm rounded-lg block p-2.5 mx-2 mb-2 sm:w-auto ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
              : "bg-gray-700 border-gray-600 text-white focus:ring-orange-500 focus:border-orange-500"
          }`}
        >
          <option value="Alle">Alle Kategorien</option>
          <option value="Comedy">Comedy</option>
          <option value="Musical">Musical</option>
          <option value="Show">Show</option>
          <option value="Theater">Theater</option>
          <option value="Konzert">Konzert</option>
          <option value="Sport">Sport</option>
          <option value="Kultur">Kultur</option>
          <option value="Boxen & Wrestling">Boxen & Wrestling</option>
        </select>

        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className={`border text-sm rounded-lg block p-2.5 mx-2 mb-2 sm:w-auto ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
              : "bg-gray-700 border-gray-600 text-white focus:ring-orange-500 focus:border-orange-500"
          }`}
        >
          <option value="Alle">Alle Städte</option>
          {/* Beispielstädte, diese können durch echte Daten ersetzt werden */}
          <option value="Berlin">Berlin</option>
          <option value="Düsseldorf">Düsseldorf</option>
          <option value="Frankfurt">Frankfurt</option>
          <option value="Hamburg">Hamburg</option>
          <option value="Köln">Köln</option>
          <option value="München">München</option>
          <option value="Stuttgart">Stuttgart</option>
          <option value="Leipzig">Leipzig</option>
          <option value="Bremen">Bremen</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          className={`border text-sm rounded-lg block p-2.5 mx-2 mb-2 sm:w-auto ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
              : "bg-gray-700 border-gray-600 text-white focus:ring-orange-500 focus:border-orange-500"
          }`}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          className={`border text-sm rounded-lg block p-2.5 mx-2 mb-2 sm:w-auto ${
            theme === "light"
              ? "bg-white border-gray-300 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
              : "bg-gray-700 border-gray-600 text-white focus:ring-orange-500 focus:border-orange-500"
          }`}
        />

        <button
          onClick={resetFilters}
          className="bg-orange-700 w-fit h-fit hover:bg-orange-400 text-white py-2 px-4 mt-0.5 rounded ml-2 mb-2 sm:ml-0 sm:mb-0"
        >
          X
        </button>
      </div>

      {/* Event-Liste */}
      <div className="flex flex-wrap lg:grid md:grid-cols-5 sm:grid-cols-1 gap-4 justify-center container mx-auto">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <div
              key={event._id}
              className={`p-2 m-2  w-full sm:w-full md:w-48 flex flex-col rounded-2xl shadow-lg hover:scale-105 transition-transform ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <img
                className="p-1 rounded-lg w-full h-32 object-cover object-top hover:scale-105 transition-transform"
                src={event.bild}
                alt={event.titel}
                style={{ height: "180px" }} // Feste Höhe für das Bild
              />
              <div className="p-2 flex flex-col flex-1">
                <h2
                  className={`text-lg font-bold ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {event.titel}
                </h2>

                <div className="flex-grow"></div>
                <div className="flex justify-center">
                  <Link to={`/events/${event._id}`}>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                      Zu den Tickets
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={`${theme === "light" ? "text-black" : "text-white"}`}>
            Keine Events gefunden.
          </p>
        )}
      </div>
      {/* Seitennummerierung */}
      <nav className="mt-4">
        <ul className="flex justify-center">
          {pageNumbers.map((number) => (
            <li key={number} className="m-4">
              <a
                onClick={() => paginate(number)}
                href="#!"
                className={`py-2 px-4 rounded ${
                  number === currentPage
                    ? "bg-orange-500 text-white"
                    : theme === "light"
                    ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AllEvents;
