import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCitiesCard from "../../Components/Home/AllCitiesCard";
import CarouselWithContent from "../../Components/Home/CarouselCities";
import CarouselWithEvents from "../../Components/Home/CorouselEvents";
import EventList from "../../Components/Home/EventList";
import MasonryGridGallery from "../../Components/Home/Galery";

import SwiperMain from "../../Components/Home/Swiper/Swiper";
import ComedySwiper from "../../Components/Home/ComedySwiper";
import KonzertSwiper from "../../Components/Home/KonzertSwiper";
import NewsLetter from "../../Components/Home/Newsletter";
import Help from "../../Components/Home/Help";
import SportSwiper from "../../Components/Home/SportSwiper";
import ShowSwiper from "../../Components/Home/ShowSwiper";
import { useDarkTheme } from "../../Context/ThemeContext";
import PopupModal from "../../Components/Home/Popup"; // Importing PopupModal component
// import ScrollToTop from "../../hooks/ScrollToTop";

const HomePage = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [openModal, setOpenModal] = useState(false); // State for modal visibility

  // <ScrollToTop />;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
    }

    setOpenModal(true); // Open modal on component mount
  }, []);

  const handleSetBackgroundColor = (color) => {
    setBackgroundColor(color);
    localStorage.setItem("backgroundColor", color);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { theme } = useDarkTheme();

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
      style={{ backgroundColor: backgroundColor }}
    >
      <PopupModal open={openModal} handleClose={handleCloseModal} />{" "}
      {/* Adding PopupModal */}
      <Settings setBackgroundColor={handleSetBackgroundColor} />
      <div className="relative z-10">
        <SwiperMain />
        <CarouselWithContent />
        <div className="container mx-auto">
          <AllCitiesCard />
          <ComedySwiper />
          <KonzertSwiper />
          <CarouselWithEvents />
          <SportSwiper />
          <ShowSwiper />
          <EventList />
          <NewsLetter />
          <MasonryGridGallery />
          <Help />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
