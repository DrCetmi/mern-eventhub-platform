import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkTheme } from "../../Context/ThemeContext";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { theme } = useDarkTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/contact`,
        { email, subject, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setEmail("");
        setSubject("");
        setMessage("");
        toast.success("Dein Message wurde erfolgreich abgesendet!", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.log(err);
      toast.error("Failed to send message.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div
          className={`rounded-lg shadow-lg p-8 max-w-lg w-full ${
            theme === "light"
              ? "bg-white bg-opacity-90"
              : "bg-gray-800 bg-opacity-90"
          }`}
        >
          <h2
            className={`text-5xl font-semibold mb-4 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Contact us
          </h2>
          <p
            className={`mb-12 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            You can reach us by email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`${theme === "light" ? "text-black" : "text-white"}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full mt-1 p-2 border ${
                  theme === "light" ? "border-gray-300" : "border-gray-700"
                } rounded-md bg-${
                  theme === "light" ? "white" : "gray-800"
                } text-${theme === "light" ? "black" : "white"}`}
                placeholder="Type your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className={`${theme === "light" ? "text-black" : "text-white"}`}
              >
                Betreff
              </label>
              <input
                type="text"
                id="subject"
                className={`w-full mt-1 p-2 border ${
                  theme === "light" ? "border-gray-300" : "border-gray-700"
                } rounded-md bg-${
                  theme === "light" ? "white" : "gray-800"
                } text-${theme === "light" ? "black" : "white"}`}
                placeholder="Betreff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className={`${theme === "light" ? "text-black" : "text-white"}`}
              >
                Message
              </label>
              <textarea
                id="message"
                className={`w-full mt-1 p-2 border ${
                  theme === "light" ? "border-gray-300" : "border-gray-700"
                } rounded-md bg-${
                  theme === "light" ? "white" : "gray-800"
                } text-${theme === "light" ? "black" : "white"}`}
                rows="6"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md ${
                  theme === "light"
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-${
                  theme === "light" ? "gray-500" : "gray-400"
                }`}
              >
                SEND MESSAGE
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      <div
        className="w-1/2 bg-cover bg-right hidden md:block relative"
        style={{
          backgroundImage:
            "url(https://yassinautomotive.com/wp-content/uploads/2022/09/contactus-1.jpg)",
        }}
      ></div>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
