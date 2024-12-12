import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Candidates from "./pages/Candidates/Candidates";
import Single from "./pages/SingleCandidate/Single";
import NewReport from "./pages/NewReport/NewReport";
import { DataProvider } from "./contexts";
import { CANDIDATES, REPORTS } from "./utils/constants";
import { useEffect, useState } from "react";
import Admin from "./pages/Admin/Admin";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
  const [classes, setClasses] = useState("outer-wrapper");
  const [refresh, setIsRefreshed] = useState(0);
  const [reportAdded, setReportAdded] = useState(0);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  }, [refresh, reportAdded]);

  return (
    <div className={classes}>
      <div className="page-wrapper">
        <Header />
        <DataProvider
          value={{
            candidates,
            reports,
            refresh,
            setIsRefreshed,
            setReportAdded,
          }}
        >
          <Routes>
            <Route index element={<Home setClasses={setClasses} />} />
            <Route
              path="candidates"
              element={<Candidates setClasses={setClasses} />}
            />
            <Route
              path="candidate/:id"
              element={<Single setClasses={setClasses} />}
            />

            <Route element={<PrivateRoutes />}>
              <Route
                path="admin"
                element={<Admin setClasses={setClasses} exact />}
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route
                path="admin/new-report"
                element={<NewReport setClasses={setClasses} />}
              />
            </Route>
          </Routes>
          <Footer />
        </DataProvider>
      </div>
    </div>
  );
}

export default App;
