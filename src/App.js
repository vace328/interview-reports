import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Candidates from "./pages/Candidates/Candidates";
import Single from "./pages/SingleCandidate/Single";
// import Login from "./Auth/Login";
import { CandidatesProvider } from "./contexts";
import { CANDIDATES } from "./utils/constants";
import { useEffect, useState } from "react";
import Admin from "./pages/Admin/Admin";

// import { TOKEN } from "./utils/constants.js";

function App() {
  const [candidates, setCandidates] = useState([]);
  // const URL = url + "/" + data.id;
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

  return (
    <>
      <CandidatesProvider value={{ candidates }}>
        <Routes>
          <Route
            index
            element={
              // <CandidatesProvider value={{ candidates }}>
              <Home />
              /* </CandidatesProvider> */
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
          {/* <Route path="/character/:id" element={<SingleCharacterPage />} /> */}
          {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
        </Routes>
      </CandidatesProvider>
    </>
  );
}

export default App;
