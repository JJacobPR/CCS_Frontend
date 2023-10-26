import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <section className={styles.sectionLogin}>
      <Header />
      <div className={styles.login}>
        <img src={person} />
        <form className={styles.loginForm}>
          <label>Login to your account</label>
          <input placeholder="email/name" />
          <input placeholder="password" />
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
