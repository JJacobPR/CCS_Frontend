import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer.jsx";

const Login = () => {

  const loginHandler = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await fetch("http://localhost:3000/auth/login")
    // } catch(error){
    //   console.error(error)
    // }
  }


  return (
    <section className={styles.sectionLogin}>
      <Header />
      <div className={styles.login}>
        <img src={person} />
        <form className={styles.loginForm}>
          <label>Login to your account</label>
          <input placeholder="email/name" />
          <input placeholder="password" />
          <button onClick={loginHandler} className={styles.link}>
            Login
          </button>
        </form>
      </div>
      <Footer/>
    </section>
  );
};

export default Login;
