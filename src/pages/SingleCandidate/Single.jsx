import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Single.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Single = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3333/api/candidates?id=${id}`)
      .then((res) => res.json())
      .then((data) => setData(data[0]));
  });
  console.log(data);
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Single;
