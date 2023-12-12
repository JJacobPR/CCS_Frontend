import styles from "./Options.module.scss";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const Options = (props) => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const [repeatPassword, updateRepeatPassword] = useState("");

  const postChanges = async (e) => {
    e.preventDefault();

    if (password != repeatPassword) {
      alert("Password are different");
      return;
    }

    try {
      const response = await fetch("https://fileuploader-ccs.onrender.com/user", {
        method: "PUT",
        headers: { Authorization: `Bearer ${props.token}`, "Content-Type": "application/json" },
        body: { name, password },
      });
      if (response.ok) alert("Files Successfully Updated");
    } catch (error) {
      console.error(error);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1>Update Your Account</h1>
        <form>
          <input
            onChange={(e) => {
              updateName(e.target.value);
            }}
            type="text"
            placeholder="Name"
            required
          />
          <input
            onChange={(e) => {
              updatePassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            required
          />
          <input
            onChange={(e) => {
              updateRepeatPassword(e.target.value);
            }}
            type="password"
            placeholder="Repeat Password"
            required
          />
          <div>
            <button onClick={props.closeModal}>Cancel</button>
            <button type="submit" onClick={postChanges}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") // The div outside your main app
  );
};

export default Options;
