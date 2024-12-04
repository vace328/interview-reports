import React from "react";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <nav>
        <NavLink to="/candidates">Candidates</NavLink>
        <button>Login</button>
      </nav>
    </div>
  );
};

export default Home;
