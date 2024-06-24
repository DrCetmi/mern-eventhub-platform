import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCities from "../Citys/Allcities";
import CarouselWithContent from "../../Components/Home/CarouselCities";
import CarouselWithEvents from "../../Components/Home/CorouselEvents";
import EventList from "../../Components/Home/EventList";
import SwiperMain from "../../Components/Home/Swiper/Swiper";
import PopupModal from "../../Components/Home/Popup";
import NewsLetter from "../../Components/Home/Newsletter";
import MasonryGridGallery from "../../Components/Home/Galery";
import ComedySwiper from "../../Components/Home/ComedySwiper";
import KonzertSwiper from "../../Components/Home/KonzertSwiper";
import AllCitiesCard from "../../Components/Home/AllCitiesCard";

const HomePage = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
    }

    setOpenModal(true);
  }, []);

  const handleSetBackgroundColor = (color) => {
    setBackgroundColor(color);
    localStorage.setItem("backgroundColor", color);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <PopupModal open={openModal} handleClose={handleCloseModal} />
      <Settings setBackgroundColor={handleSetBackgroundColor} />
      <div className="relative z-10">
        <SwiperMain />
        <CarouselWithContent />
        <div className="container mx-auto">
          <AllCitiesCard />
          <ComedySwiper />
          <KonzertSwiper />
          <CarouselWithEvents />
          <ComedySwiper />
          <KonzertSwiper />
          <EventList />
          <NewsLetter />

          <MasonryGridGallery />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
