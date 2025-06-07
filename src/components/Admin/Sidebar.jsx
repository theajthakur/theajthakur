import { LayoutDashboard, LogOut, MessageCircle } from "lucide-react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { notyf } from "../../utils/notyf";

export default function Sidebar({ setIsLoggedIn }) {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <span className="braces">{"{"}</span>
        <span className="text">VijLab</span>
        <span className="braces">{"}"}</span>
      </div>
      <div className="sidebar__menu">
        <ul>
          <li>
            <Link to={"/admin"}>
              <span className="icon">
                <LayoutDashboard />
              </span>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/message"}>
              <span className="icon">
                <MessageCircle />
              </span>
              <span className="text">Messages</span>
            </Link>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("portfolio_admin_token");
              notyf.success("Logged Out!");
              setTimeout(() => {
                setIsLoggedIn(false);
              }, 1000);
            }}
          >
            <span className="icon">
              <LogOut />
            </span>
            <span className="text">Logout</span>
          </li>
        </ul>
      </div>
      <div className="sidebar__footer">
        <p>&copy; 2025 VijLab</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
}
