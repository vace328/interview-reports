import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { candidatesContext } from "../../contexts";
import "./Candidates.css";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";

const Candidates = () => {
  const candidates = useContext(candidatesContext);

  console.log(candidates);

  const [search, setSearch] = useState("");
  const filteredCandidates = candidates?.candidates?.filter((candidate) => {
    return candidate?.name.toLowerCase().includes(search);
  });
  return (
    <>
      <div>
        <Header />
        <div className="content-wrapper">
          <h1>Candidates</h1>
          <Search
            search={search}
            setSearch={setSearch}
            candidates={candidates}
          />
          <div className="cards-wrapper">
            {filteredCandidates?.map((candidate) => {
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
