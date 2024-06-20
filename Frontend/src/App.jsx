import { Routes, Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
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
import EventsPage from "./Pages/Categories/EventsPage";
import HomeLayout from "./Layout/HomeLayout";
import AllCities from "./Pages/Citys/Allcities";
import City from "./Pages/Citys/City";
import EventDetails from "./Pages/Categories/EventDetails";

function App() {
  return (
    <Routes>
      <Route
        path="https://mern-eventhub-platform.onrender.com/sign-up"
        element={<SignUp />}
      />
      <Route
        path="https://mern-eventhub-platform.onrender.com/login"
        element={<Login />}
      />
      <Route
        path="https://mern-eventhub-platform.onrender.com/"
        element={<HomeLayout />}
      >
        <Route index element={<HomePage />} />
        <Route
          path="https://mern-eventhub-platform.onrender.com/categories"
          element={<EventsPage />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/events/:id"
          element={<EventDetails />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/cities/:city?"
          element={<City />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/allcities"
          element={<AllCities />}
        />
      </Route>
      <Route
        path="https://mern-eventhub-platform.onrender.com/customer-dashboard"
        element={
          <PrivateRoute>
            <ProfileLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Profile />} />
      </Route>
      <Route
        path="https://mern-eventhub-platform.onrender.com/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          path="https://mern-eventhub-platform.onrender.com/admin"
          element={<Statistics />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/admin/users"
          element={<UsersTable />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/admin/tickets"
          element={<TicketTable />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/admin/events"
          element={<EventsTableList />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/admin/inbox"
          element={<Inbox />}
        />
        <Route
          path="https://mern-eventhub-platform.onrender.com/admin/profile"
          element={<Profile />}
        />
      </Route>
    </Routes>
  );
}

export default App;
