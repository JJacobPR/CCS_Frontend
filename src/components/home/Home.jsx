import styles from "./Home.module.scss";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={styles.homeSection}>
      <Header />
      <div className={styles.homeButtons}>
        <div>
          <p>Register Today!</p>
          <Link className={styles.btn} style={{ textDecoration: "none" }} to="/register">
            Register
          </Link>
        </div>
        <div>
          <p>Already have an account?</p>
          <Link className={styles.btn} style={{ textDecoration: "none" }} to="/login">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
