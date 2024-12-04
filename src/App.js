import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Candidates from "./pages/Candidates/Candidates";
import Login from "./Auth/Login"

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="candidates" element={<Candidates />} />
      <Route path="login" element={<Login />} />



      {/* <Route path="/character/:id" element={<SingleCharacterPage />} /> */}
      {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
    </Routes>
  );
}

export default App;
