import styles from "./Home.module.scss";
import logo from "../../assets/img/logo.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <p>Welcome to Throw Crate</p>
      <img src={logo} />
    </div>
  );
};

export default Header;
