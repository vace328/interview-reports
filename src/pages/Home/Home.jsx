import React from "react";
import { NavLink } from "react-router";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div>
        <nav>
          <NavLink to="/candidates">Candidates</NavLink>
          <button>Login</button>
        </nav>
        <main>
          <div className="welcome-text">
            <h1>Welcome Candidates</h1>
          </div>

          <div className="business-image">
            <img
              src="https://thumbs.dreamstime.com/b/business-meeting-silhouette-sunset-37284204.jpg"
              alt=""
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
