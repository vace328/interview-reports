import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Modal.css";
import { useNavigate } from "react-router";
// import { useAuth } from "../../contexts";

const LoginModal = ({ isLoggedIn, setIsLoggedIn }) => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const authContext = useAuth();

  // Reset email and password when the component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    setLoading(true);
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      const token = "Bearer " + data.accessToken;
      localStorage.setItem("authToken", token);
      // Reset fields after successful login
      setEmail("");
      setPassword("");

      setVisible(false);
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      navigate("/admin");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Incorrect email or password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
          setErrorMessage("");
        }}
      >
        LOGIN
      </button>

      <Modal
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        style={{
          overlay: {
            background: "#02040f55",
          },
          content: {
            width: "800px",
            height: "500px",
            display: "flex",
            background: "white",
            margin: "auto",
            borderRadius: "25px",
          },
        }}
      >
        <div className="login-info">
          <h1 className="welcome">Welcome</h1>
          <p>Username:</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
            className="submit-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="shaking">
          <img
            src="https://www.strunkmedia.com/wp-content/uploads/2017/02/bigstock-Business-people-shaking-hands-13873058.jpg"
            alt="shaking"
          />
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
