import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Login.module.scss";
import Footer from "../footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import createCookie from "../../helpers/createCookie.js";
import getCookies from "../../helpers/getCookies.js";
import { useDispatch } from "react-redux";
import { update } from "../../store/cookieSlice.js";

const Login = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = getCookies();
    if (cookies.refreshToken !== "" || cookies.token !== "") navigate("/user");
  });

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://fileuploader-ccs.onrender.com/auth/login", {
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

      if (!response.ok) throw new Error(response.statusText);

      createCookie("refreshToken", data.refreshToken, 3600);
      createCookie("token", data.accessToken, 30);
      dispatch(update());

      navigate("/user");
    } catch (error) {
      if (error.message === "Not Found") {
        alert("Wrong Credentials");
      }
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
