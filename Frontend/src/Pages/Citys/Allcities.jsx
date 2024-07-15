import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDarkTheme } from "../../Context/ThemeContext";
import "../../index.css";

const cities = [
  {
    name: "Berlin",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-berlin.jpg",
    link: "/cities/berlin",
  },
  {
    name: "Düsseldorf",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-duesseldorf.jpg",
    link: "/cities/düsseldorf",
  },
  {
    name: "Frankfurt",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-frankfurt.jpg",
    link: "/cities/frankfurt",
  },
  {
    name: "Hamburg",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-hamburg.jpg",
    link: "/cities/hamburg",
  },
  {
    name: "Köln",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-koeln.jpg",
    link: "/cities/köln",
  },
  {
    name: "München",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-muenchen.jpg",
    link: "/cities/münchen",
  },
  {
    name: "Stuttgart",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-stuttgart.jpg",
    link: "/cities/stuttgart",
  },
  {
    name: "Leipzig",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-leipzig.jpg",
    link: "/cities/leipzig",
  },
  {
    name: "Bremen",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-bremen.jpg",
    link: "/cities/bremen",
  },
];

const AllCities = () => {
  const { theme } = useDarkTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-gray-900"
      } min-h-screen`}
    >
      <Outlet />
      <div className="lg:grid md:grid-cols-5 my-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center md:flex md:flex-wrap md:justify-center lg:gap-2 m-10">
        {cities.map((city, index) => (
          <Link
            to={city.link}
            key={index}
            className={`border-2 p-4 text-center flex flex-col items-center rounded-lg mt-3 transition duration-500 ease-in-out ${
              theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
            } ${
              theme === "light"
                ? "bg-white border-gray-300"
                : "bg-gray-800 border-gray-700"
            } ${theme === "light" ? "text-black" : "text-white"}`}
          >
            <img src={city.imgSrc} alt={city.name} className="w-52 mb-2" />
            <p className="text-center">die coolsten Events in</p>
            <span
              className={`text-center ${
                theme === "light" ? "text-orange-800" : "text-orange-400"
              }`}
            >
              {city.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCities;
