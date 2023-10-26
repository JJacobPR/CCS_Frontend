import styles from "./Home.module.scss";
import logo from "../../assets/img/logo.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Welcome to Throw Crate</h1>
      <img src={logo} />
    </div>
  );
};

export default Header;
