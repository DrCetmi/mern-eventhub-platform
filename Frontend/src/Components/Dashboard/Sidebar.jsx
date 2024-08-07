import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  UserCircleIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { FaUsers, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/eventhub-logo.png";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Sidebar() {
  const location = useLocation();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const HandleLogout = () => {
    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
    // Clear user data from localStorage if needed
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-300">
      <div className="mb-2 p-4">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <List className="sm:">
        <Link to="/admin">
          <ListItem selected={location.pathname === "/admin"}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/admin/users">
          <ListItem selected={location.pathname === "/admin/users"}>
            <ListItemPrefix>
              <FaUsers className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
        </Link>
        <Link to="/admin/events">
          <ListItem selected={location.pathname === "/admin/events"}>
            <ListItemPrefix>
              <FaCalendarAlt className="h-5 w-5" />
            </ListItemPrefix>
            Events
          </ListItem>
        </Link>
        <Link to="/admin/tickets">
          <ListItem selected={location.pathname === "/admin/tickets"}>
            <ListItemPrefix>
              <FaTicketAlt className="h-5 w-5" />
            </ListItemPrefix>
            Tickets
          </ListItem>
        </Link>

        <Link to="/admin/inbox">
          <ListItem selected={location.pathname === "/admin/inbox"}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="4"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to="/admin/profile">
          <ListItem selected={location.pathname === "/admin/profile"}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        <ListItem onClick={HandleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}
