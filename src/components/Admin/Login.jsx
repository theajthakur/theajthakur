import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { notyf } from "../../utils/notyf";

const CenteredPasswordInput = ({ setIsLoggedIn }) => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!localStorage.portfolio_admin_token) return;
    fetch(`${apiURL}/admin/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: localStorage.portfolio_admin_token }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to Login");
        return res.json();
      })
      .then((data) => {
        if (data.status == "error") {
          localStorage.removeItem("portfolio_admin_token");
        } else {
          notyf.success(data.message);
          setIsLoggedIn(true);
        }
      });
  }, []);
  const attemptLogin = (event) => {
    event.preventDefault();
    fetch(`${apiURL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to Login");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("portfolio_admin_token", data.token);
        notyf[data.status](data.message);
        if (data.status === "success") {
          setTimeout(() => setIsLoggedIn(true), 3000);
        }
      })
      .catch((err) => {
        notyf.error(err.message || "Something went wrong!");
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <form onSubmit={attemptLogin}>
        <div className="position-relative" style={{ width: "300px" }}>
          <input
            type={visible ? "text" : "password"}
            className="form-control pe-5"
            placeholder="Enter your password"
            value={password}
            onInput={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div
            className="position-absolute top-50 end-0 translate-middle-y me-3"
            role="button"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        {password && (
          <button className="btn btn-primary mt-3 w-100" onClick={attemptLogin}>
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default CenteredPasswordInput;
