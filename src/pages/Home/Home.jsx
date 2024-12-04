import React from "react";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <nav>
        <NavLink to="/candidates">Candidates</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </div>
  );
};

export default Home;
