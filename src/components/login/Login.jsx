import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import { useState } from "react";
import createCookie from "../../helpers/createCookie.js";

const Login = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const navigate = useNavigate();

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
        <form className={styles.loginForm}>
          <label>Login to your account</label>
          <input onChange={(e) => updateEmail(e.target.value)} placeholder="email" />
          <input onChange={(e) => updatePassword(e.target.value)} placeholder="password" />
          <button onClick={loginHandler} className={styles.link}>
            Login
          </button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default Login;
