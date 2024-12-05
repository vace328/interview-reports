import React from "react";
import "./Footer.css"; // Ensure you have a corresponding CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      <div className="footer-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/candidates">Candidates</NavLink>
        {/* <a href="/about">About</a> */}
      </div>
    </footer>
  );
};

export default Footer;
