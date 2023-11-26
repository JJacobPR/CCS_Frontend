import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Register.module.scss";
import Footer from "../footer/Footer.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [repeatPassword, updateRepeatPassword] = useState("");
  const [error, setError] = useState({ active: false, message: "none" });
  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();
    setError({ active: false, message: "" });
    try {
      if (!checkPasswordIdentical()) throw new Error("Passwords are varying");

      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmpassword: repeatPassword,
        }),
      });

      if (!response.ok) throw new Error(response.statusText);

      navigate("/login");
    } catch (error) {
      if (error.message === "Conflict") {
        setError({ active: true, message: "Email already in use" });
      } else if (error.message === "Passwords are varying") {
        setError({ active: true, message: error.message });
      } else {
        setError({ active: true, message: "An error has ocurred" });
      }
    }
  };

  const checkPasswordIdentical = () => {
    if (password === repeatPassword) return true;
    else return false;
  };

  return (
    <section className={styles.sectionRegister}>
      <Header />
      <div className={styles.register}>
        <img src={person} />
        <form onSubmit={registerHandler} className={styles.registerForm}>
          <label>Create new account</label>
          <input
            onChange={(e) => {
              updateName(e.target.value);
            }}
            placeholder="Name"
            required
          />
          <input
            type="email"
            onChange={(e) => {
              updateEmail(e.target.value);
            }}
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => {
              updatePassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
          <input
            type="password"
            onChange={(e) => {
              updateRepeatPassword(e.target.value);
            }}
            placeholder="Repeat password"
            required
          />
          <button type="submit">Register</button>
          <Link style={{ textDecoration: "none" }} className={styles.linkLogin} to="/login">
            Have an account? Login Here
          </Link>
          {error.active && <p className={styles.errorMessage}>{error.message}</p>}
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default Register;
