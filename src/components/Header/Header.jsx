import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import Modal from "../Modal/Modal";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  return (
    <header>
      <nav className="logo">
        <NavLink to="/">
          <img src={Logo} alt="logo" />
        </NavLink>
      </nav>

      <div className="links-container">
        {isLoggedIn && (
          <div className="nav-link reports">
            <NavLink to="/admin">REPORTS</NavLink>
          </div>
        )}

        <div className="nav-link candidates">
          <NavLink to="/candidates">CANDIDATES</NavLink>
        </div>

        <div className="login nav-link">
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.setItem("isLoggedIn", false);
                localStorage.removeItem("authToken");
                navigate("/");
              }}
            >
              LOG OFF
            </button>
          ) : (
            <Modal setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
