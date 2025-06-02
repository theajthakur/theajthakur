import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Index.css";
import Sidebar from "./Sidebar";
import ActiveUsersStats from "./ActiveUsersStats";
import Message from "./Message";

export default function Admin() {
  return (
    <div className="admin-window-handler">
      <div className="admin-window-handler__sidebar">
        <Sidebar />
      </div>
      <div className="admin-window-handler__content">
        <Routes>
          <Route path="/message" element={<Message />} />
          <Route path="/*" element={<ActiveUsersStats />} />
        </Routes>
      </div>
    </div>
  );
}
