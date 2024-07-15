import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { LinkIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useDarkTheme } from "../../Context/ThemeContext";

function AboutPage() {
  const [admins, setAdmins] = useState([]);
  const { theme } = useDarkTheme();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/Users`
        );
        const adminUsers = response.data.filter(
          (user) => user.role === "admin"
        );
        setAdmins(adminUsers);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };

    fetchAdmins();
  }, []);

  function TeamCard({ img, name, title }) {
    return (
      <Card
        className={`rounded-lg ${
          theme === "light" ? "bg-white" : "bg-[#2D2D2D]"
        } shadow-md`}
      >
        <CardBody className="text-center bg-blue-gray-700 rounded-lg">
          <Avatar
            src={img}
            alt={name}
            variant="circular"
            size="xxl"
            className={`mx-auto mb-6 object-cover border-4 ${
              theme === "light" ? "border-gray-200" : "border-gray-800"
            }`}
          />
          <Typography
            variant="h5"
            color={theme === "light" ? "black" : "white"}
            className="!font-medium text-lg"
          >
            {name}
          </Typography>
          <Typography variant="body1" color="orange" className="!text-sm">
            {name === "Durmus Cetmi"
              ? "Full-stack Developer"
              : "Full-stack Developer"}
          </Typography>

          <div className="flex items-center justify-center gap-1.5">
            <IconButton variant="text" color="gray">
              <GlobeAltIcon
                className="h-6 w-6"
                color={theme === "light" ? "black" : "white"}
              />
            </IconButton>
            <IconButton variant="text" color="gray">
              <LinkIcon
                className="h-6 w-6"
                color={theme === "light" ? "black" : "white"}
              />
            </IconButton>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <section className="min-h-screen py-8 px-8 lg:py-28">
        <div className="container mx-auto">
          <div className="mb-16 text-center lg:mb-28">
            <Typography
              variant="h6"
              color={theme === "light" ? "black" : "white"}
              className="text-lg"
            >
              Meet Our Admins
            </Typography>
            <Typography
              variant="h1"
              color={theme === "light" ? "black" : "white"}
              className="my-2 !text-2xl lg:!text-4xl"
            >
              The Minds Behind Our Success
            </Typography>
            <Typography
              variant="lead"
              className={`mx-auto w-full !${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              } max-w-4xl`}
            >
              Our dedicated admins ensure everything runs smoothly, providing
              exceptional leadership and support across the board.
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {admins.map((admin, key) => (
              <TeamCard
                key={key}
                img={admin.profilePicture || "default-profile.png"}
                name={admin.name}
                title={admin.role}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
