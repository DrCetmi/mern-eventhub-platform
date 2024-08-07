import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/img/eventhub-logo.png";
import login from "../../assets/img/login.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDarkTheme } from "../../Context/ThemeContext";

export function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "" || "customer",
    ProfilePicture: null,
    id: "",
  });

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Both email and password are required");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, credentials)
      .then((res) => {
        toast.success("Login successful!");
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });

        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/customer-dashboard");
          }
        }, 2000); // Redirect after 2 seconds
      })
      .catch((err) => {
        toast.error("Error logging in. Please try again.");
        console.log(err);
      });
  };
  const { theme } = useDarkTheme();

  return (
    <section className="m-2 flex flex-col items-center">
      <ToastContainer />
      <div className="text-center mb-2">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-52 mx-auto" />
        </Link>
        <Typography variant="h2" className="font-bold mb-4">
          Login
        </Typography>
        <Typography
          variant="paragraph"
          className={`text-lg font-normal theme === "light" ? "text-black" : "text-white"`}
        >
          Sign in to access all the features.
        </Typography>
      </div>
      <div className="flex w-full lg:w-3/5 items-center justify-between gap-4">
        <div className="w-1/2 h-full hidden lg:flex items-center justify-center ml-4">
          <img
            src={login}
            className="h-full w-full object-cover rounded-3xl shadow-2xl border-2 border-gray-200 hover:shadow-2xl transition duration-300 ease-in-out"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" className="-mb-3 font-medium">
                Email Address
              </Typography>
              <Input
                type="email"
                size="lg"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Login
            </Button>
          </form>
          <Typography
            variant="paragraph"
            className="text-center  font-medium mt-4"
          >
            Don't have an account yet?{" "}
            <Link to="/sign-up" className="text-orange-900 ml-1">
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </section>
  );
}

export default Login;
