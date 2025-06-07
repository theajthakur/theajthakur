import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Index.css";
import Sidebar from "./Sidebar";
import ActiveUsersStats from "./ActiveUsersStats";
import Message from "./Message";
import Login from "./Login";
import { useState } from "react";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  return (
    <>
      {isLoggedIn ? (
        <div className="admin-window-handler">
          <div className="admin-window-handler__sidebar">
            <Sidebar setIsLoggedIn={setIsLoggedIn} />
          </div>
          <div className="admin-window-handler__content">
            <Routes>
              <Route path="/message" element={<Message />} />
              <Route path="/*" element={<ActiveUsersStats />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}
