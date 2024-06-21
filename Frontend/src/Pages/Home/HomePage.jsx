import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCities from "../Citys/Allcities";
import CarouselWithContent from "../../Components/Home/CarouselCities";
import CarouselWithEvents from "../../Components/Home/CorouselEvents";
import EventList from "../../Components/Home/EventList";
import SwiperMain from "../../Components/Home/Swiper/Swiper";
import PopupModal from "../../Components/Home/Popup";

const HomePage = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
    // Sayfa yüklendiğinde modal'ı göster
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
          <AllCities />
        </div>
        <CarouselWithEvents />
        <EventList />
      </div>
    </div>
  );
};

export default HomePage;
