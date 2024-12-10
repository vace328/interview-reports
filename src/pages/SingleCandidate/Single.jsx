import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import "./Single.css";
import useResize from "../../hooks/useResize";
import ReportsTable from '../../components/ReportsTable/ReportsTable'


const Single = ({ setClasses }) => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const ref = useRef(null);
  const isShortContent = useResize(ref);
  let contentDivClass = isShortContent ? "outer-wrapper shortContent" : "outer-wrapper";
  useEffect(() => setClasses(contentDivClass));

  useEffect(() => {
    fetch(`http://localhost:3333/api/candidates?id=${id}`)
      .then((res) => res.json())
      .then((data) => setData(data[0]));
  }, []);
  
  return (
    <div className="content-wrapper" ref={ref}>
      <div className="container">
        <div className="left">
          <img src={data?.avatar} alt="" />
        </div>
        <div className="center">
          <p>Name:</p>
          <h1>{data?.name}</h1>
          <p>Email:</p>
          <h1>{data?.email}</h1>
        </div>
        <div className="right">
          <p>Date of birth:</p>
          <h1>{data?.birthday}</h1>
          <p>Education:</p>
          <h1>{data?.education}</h1>
        </div>
      </div>
      <ReportsTable id={id} />
    </div>
  );
};
export default Single;
