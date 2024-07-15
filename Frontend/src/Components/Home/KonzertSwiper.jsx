import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const KonzertSwiper = () => {
  const [konzertEvents, setKonzertEvents] = useState([]);

  useEffect(() => {
    fetchKonzertEvents();
  }, []);

  const fetchKonzertEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/event`
      );
      const konzertEventsData = response.data.filter(
        (event) => event.kategorie === "Konzert"
      );
      setKonzertEvents(konzertEventsData);
    } catch (error) {
      console.error("Error fetching konzert events:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 pr-6 border-t-4 border-r-4 border-gray-300 my-2">
      <p className="text-2xl py-2">Konzerte</p>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        spaceBetween={10}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {konzertEvents.length > 0 ? (
          konzertEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="flex justify-center items-center">
                <Link to={`/events/${event._id}`}>
                  <img
                    className="w-full h-40 md:h-60 lg:h-80 object-cover rounded-lg"
                    src={event.bild}
                    alt={event.titel}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>Keine Konzerte gefunden.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default KonzertSwiper;
