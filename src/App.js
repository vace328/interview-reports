import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Candidates from "./pages/Candidates/Candidates";
import Single from "./pages/SingleCandidate/Single";
// import Login from "./Auth/Login";
import { DataProvider } from "./contexts";
import { CANDIDATES, REPORTS } from "./utils/constants";
import { useEffect, useState } from "react";
import Admin from "./pages/Admin/Admin";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
 
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
        "Content-Type": "application/json"
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
    <>
      <DataProvider value={{ candidates, reports }}>
        <Routes>
          <Route
            index
            element={
              <Home />
            }
          />
          <Route
            path="candidates"
            element={
              <Candidates />
            }
          />
          <Route
            path="candidate/:id"
            element={
              <Single />
            }
          />
          <Route
            path="admin"
            element={
              <Admin />
            }
          />          
        </Routes>
      </DataProvider>
    </>
  );
}

export default App;
