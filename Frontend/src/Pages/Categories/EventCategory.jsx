import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, Outlet } from "react-router-dom";
import "../../index.css";
import { useDarkTheme } from "../../Context/ThemeContext";

const EventCategory = () => {
  const [events, setEvents] = useState([]);
  const { category } = useParams();
  const { theme } = useDarkTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/event`)
      .then((response) => {
        const categoryEvents = response.data.filter(
          (event) => event.kategorie.toLowerCase() === category.toLowerCase()
        );
        setEvents(categoryEvents);
        console.log(categoryEvents);
      })
      .catch((error) => {
        console.error(
          "Beim Abrufen der Events ist ein Fehler aufgetreten!",
          error
        );
      });
  }, [category]);

  return (
    <div>
      <Outlet />
      <div
        className={`flex flex-col ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900"
        }`}
      >
        <p
          className={`text-5xl text-center p-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Beliebtesten Events in der Kategorie {category}
        </p>

        <div className="flex flex-wrap lg:grid md:grid-cols-5 justify-center container mx-auto">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className={`p-2 m-2  w-48 flex flex-col rounded-2xl shadow-lg hover:scale-105 transition-transform ${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                }`}
              >
                <img
                  className="w-full h-32 object-cover object-top"
                  src={event.bild}
                  alt={event.titel}
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
                  <div className="flex justify-center mt-2">
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
            <p
              className={`text-lg ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Keine Events gefunden für die Kategorie{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
