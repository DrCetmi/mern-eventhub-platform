import { Routes, Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";

import Statistics from "./Pages/Dashboard/StatisticTable";
import Profile from "./Pages/Dashboard/Profile";
import EventsTableList from "./Pages/Dashboard/EventsTableList";
import SignUp from "./Pages/Login/Register";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/Login/Login";
import ProfileLayout from "./Layout/ProfileLayout";
import PrivateRoute from "./Components/Dashboard/PrivateRoute";
import AdminRoute from "./Components/Dashboard/AdminRoute";
import Inbox from "./Pages/Dashboard/Inbox";
import HomePage from "./Pages/Home/HomePage";
import HomeLayout from "./Layout/HomeLayout";
import AllCities from "./Pages/Citys/Allcities";
import City from "./Pages/Citys/City";
import EventDetails from "./Pages/Categories/EventDetails";
import EventCategory from "./Pages/Categories/EventCategory";
import AllEvents from "./Pages/Categories/AllEvents";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import TicketTable from "./Pages/Dashboard/TicketTable";
import TicketSelectionPage from "./Components/Tickets/TicketSelectionPage";
import Warenkorb from "./Components/Tickets/Warenkorb";
import TicketSuccess from "./Components/Tickets/TicketSuccess";
import Search from "./Components/Search/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/cities/:city?" element={<City />} />
        <Route path="/allcities" element={<AllCities />} />
        <Route path="/categories/:category?" element={<EventCategory />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/select-ticket" element={<TicketSelectionPage />} />
        <Route path="/success" element={<TicketSuccess />} />
        <Route path="/cart" element={<Warenkorb />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<Search />} />
      </Route>
      <Route
        path="/customer-dashboard"
        element={
          <PrivateRoute>
            <ProfileLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Profile />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<Statistics />} />
        <Route path="/admin/users" element={<UsersTable />} />
        <Route path="/admin/tickets" element={<TicketTable />} />
        <Route path="/admin/events" element={<EventsTableList />} />
        <Route path="/admin/inbox" element={<Inbox />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
export default App;
