import React, { useContext, useEffect, useRef, useState } from "react";
import { dataContext } from "../../contexts";
import "./Candidates.css";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import useResize from "../../hooks/useResize";

const Candidates = ({ setClasses }) => {
  const candidates = useContext(dataContext).candidates;
   const [search, setSearch] = useState("");
  const filteredCandidates = candidates?.filter((candidate) => {
    return candidate?.name?.toLowerCase().includes(search);
  });

  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent ? "outer-wrapper shortContent" : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

  return (
    <>
      <div className="content-wrapper" ref={ref}>
        <h1>Candidates</h1>
        <Search search={search} setSearch={setSearch} candidates={candidates} />

        <div className="cards-wrapper">
          {filteredCandidates?.map((candidate) => {
            return <Card candidate={candidate} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Candidates;
