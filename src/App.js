import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Candidates from "./pages/Candidates/Candidates";
import Single from "./pages/SingleCandidate/Single";
import { DataProvider } from "./contexts";
import { CANDIDATES, REPORTS } from "./utils/constants";
import { useEffect, useState } from "react";
import Admin from "./pages/Admin/Admin";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
  const [classes, setClasses] = useState("outer-wrapper");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: TOKEN,
      },
    };

    fetch(CANDIDATES, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCandidates(res);
      });
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(REPORTS, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setReports(res);
      });
  }, []);

  return (
    <div className={classes}>   
      <div className="page-wrapper">
        <Header />
        <DataProvider value={{ candidates, reports }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="candidates" element={<Candidates setClasses={setClasses} />} />
            <Route path="candidate/:id" element={<Single />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </DataProvider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
