import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Login.module.scss";
import Footer from "../footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import createCookie from "../../helpers/createCookie.js";
import { useDispatch } from 'react-redux'
import { update } from "../../store/cookieSlice.js";

const Login = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      createCookie("refreshToken", data.refreshToken, 2);
      createCookie("token", data.accessToken, 1);
      dispatch(update())

      if (!response.ok) throw new Error(response.statusText);

      navigate("/user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.sectionLogin}>
      <Header />
      <div className={styles.login}>
        <img src={person} />
        <form onSubmit={loginHandler} className={styles.loginForm}>
          <label>Login to your account</label>
          <input type="email" onChange={(e) => updateEmail(e.target.value)} placeholder="Email" required />
          <input type="password" onChange={(e) => updatePassword(e.target.value)} placeholder="Password" required />
          <button type="submit" className={styles.link}>
            Login
          </button>
          <Link style={{ textDecoration: "none" }} className={styles.linkRegister} to="/register">
            Don't have account? Register here
          </Link>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default Login;
