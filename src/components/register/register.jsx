import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Register.module.scss";

const Register = () => {
  return (
    <section className={styles.sectionRegister}>
      <Header />
      <div className={styles.register}>
        <img src={person} />
        <form className={styles.registerForm}>
          <label>Create new account</label>
          <input placeholder="email/name" />
          <input placeholder="password" />
          <input placeholder="repeat password" />
          <button>Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;