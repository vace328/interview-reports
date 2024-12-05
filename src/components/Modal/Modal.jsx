import React from "react";
import Model from "react-modal";
import { useState } from "react";
import "./Modal.css";

const Modal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {/* <button onClick={() => setVisible(true)}>Login</button> */}

      <Model
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
          <div></div>
          <h1 className="welcome">Welcome</h1>
          <p>Username: </p>
          <input type="text" />

          <p>Password:</p>
          <input type="password" />

          <button className="submit-button">Login</button>
        </div>

        <div className="shaking">
          <img
            src="https://www.strunkmedia.com/wp-content/uploads/2017/02/bigstock-Business-people-shaking-hands-13873058.jpg"
            alt="shaking"
          />
        </div>
      </Model>
    </>
  );
};

export default Modal;
