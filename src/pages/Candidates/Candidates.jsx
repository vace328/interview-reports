import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { candidatesContext } from "../../contexts";
import "./Candidates.css";
import Card from "../../components/Card/Card";

const Candidates = () => {
  const candidates = useContext(candidatesContext);
  // console.log(candidates);

  return (
    <>
      <div>
        <Header />
        <div className="content-wrapper">
          <h1>Candidates</h1>
          <div className="cards-wrapper">
            {candidates?.candidates?.map((candidate) => {
              return <Card candidate={candidate} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Candidates;
