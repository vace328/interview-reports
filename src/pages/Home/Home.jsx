import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [pageWrapperHeight, setPageWrapperHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setPageWrapperHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  // console.log(windowHeight);
  // console.log(pageWrapperHeight);

  let isShortContent =
    windowHeight > pageWrapperHeight
      ? "outer-wrapper shortContent"
      : "outer-wrapper";

  return (
    <div className={isShortContent}>
      <div className="page-wrapper" ref={ref}>
        <Header />
        <div className="content-wrapper">
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
          <p>ghdvdgvdv</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
