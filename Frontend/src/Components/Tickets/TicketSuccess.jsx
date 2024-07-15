import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDarkTheme } from "../../Context/ThemeContext";

const TicketSuccess = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const { ticket, quantity, totalPrice } = location.state || {};
  const { theme } = useDarkTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!ticket) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900"
        } p-4`}
      >
        <div
          className={`p-8 rounded-lg shadow-md max-w-md w-full ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div className="text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${
                theme === "light" ? "text-red-600" : "text-red-400"
              }`}
            >
              Fehler: Ticketdaten nicht verfügbar.
            </h2>
            <p
              className={`mb-4 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Es scheint ein Problem mit den Ticketdaten zu geben. Bitte
              versuche es später erneut.
            </p>
            <Link to="/">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
                Zur Startseite
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { title, artist, date, eventLocation, startTime, endTime, image } =
    ticket;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      } lg:p-7 sm:p-0 md:p-0`}
    >
      <div
        className={`p-5 rounded-lg shadow-md max-w-md w-full ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="text-center">
          <img src={image} alt={title} className="w-48 h-48 mx-auto mb-2" />
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "light" ? "text-green-600" : "text-green-400"
            }`}
          >
            Ticket erfolgreich gekauft!
          </h2>
          <p
            className={`mb-4 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Du erhältst eine Email mit allen Zahlungsinformationen. Dein Ticket
            wird 2 Tage nach Bezahlung aktiviert.
          </p>
          <p
            className={`mb-4 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Du hast 14 Tage Zeit, um die Zahlung abzuschließen.
          </p>
          <div
            className={`text-left p-4 rounded-lg mb-4 ${
              theme === "light" ? "bg-gray-200" : "bg-gray-700"
            } sm:text-sm`}
          >
            <h3
              className={`text-xl font-semibold mb-2 ${
                theme === "light" ? "text-gray-900" : "text-gray-200"
              }`}
            >
              Zusammenfassung:
            </h3>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Ticket:</strong> {title}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Künstler:</strong> {artist}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Datum:</strong> {formatDate(date)}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Ort:</strong> {eventLocation}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Startzeit:</strong> {startTime}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Endzeit:</strong> {endTime}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Gekauft von:</strong> {user.email}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Anzahl:</strong> {quantity}
            </p>
            <p
              className={`mb-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <strong>Gesamtpreis:</strong> {totalPrice.toFixed(2) + " €"}
            </p>
          </div>
          <Link
            to={
              user.role === "admin" ? "/admin/profile" : "/customer-dashboard"
            }
          >
            <button className="bg-orange-500 text-white px-4 py-2 mr-5 rounded-lg hover:bg-orange-700 transition duration-300">
              Zu meinen Tickets
            </button>
          </Link>
          <Link to="/">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
              Zur Startseite
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketSuccess;
