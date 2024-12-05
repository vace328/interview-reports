import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { candidatesContext } from "../../contexts";
import "./Candidates.css";

const Candidates = () => {
  const candidates = useContext(candidatesContext);
  console.log(candidates);

  return (
    <>
      <div>
        <Header />
        <div className="content-wrapper">Candidates</div>
      </div>
      <Footer />
    </>
  );
};

export default Candidates;
