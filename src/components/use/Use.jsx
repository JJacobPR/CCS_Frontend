import logo from "../../assets/img/logo.svg";
import FileBox from "./FileBox.jsx";
import styles from "./Use.module.scss";

const Use = () => {
  return (
    <section className={styles.useSection}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <div className={styles.app}>
        <h1>Throw Crate</h1>
        <FileBox />
      </div>
    </section>
  );
};

export default Use;
