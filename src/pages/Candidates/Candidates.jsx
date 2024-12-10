import React, { useContext, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { dataContext } from "../../contexts";
import "./Candidates.css";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import useResize from "../../hooks/useResize";

const Candidates = () => {
  const candidates = useContext(dataContext).candidates;
  const ref = useRef(null);
  const isShortContent = useResize(ref);

  let contentDivClass = isShortContent ? "test shortContent" : "test";

  const [search, setSearch] = useState("");
  const filteredCandidates = candidates?.filter((candidate) => {
    return candidate?.name?.toLowerCase().includes(search);
  });
  return (
    <div className={contentDivClass}>
      <div className="page-wrapper">
        <Header />
        <div className="content-wrapper" ref={ref}>
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
        <Footer />
      </div>
    </div>
  );
};

export default Candidates;
