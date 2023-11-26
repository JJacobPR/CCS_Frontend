import logo from "../../assets/img/logo.svg";
import Footer from "../footer/Footer.jsx";
import FileBox from "./FileBox.jsx";
import styles from "./User.module.scss";
import refreshTokenFunc from "../../helpers/refreshToken.js";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const User = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [zipBlob, updateZipBlob] = useState({});

  const loginUser = useCallback(async () => {
    try {
      if (Object.keys(cookies).length === 0) throw new Error("No Refresh Token");

      //Fix library is not working as intended when refreshingToken, must be fixed
      if (!Object.keys(cookies).includes("token")) {
        await refreshTokenFunc(cookies.refreshToken);
        console.log(document.cookie);
        console.log(cookies);
      }
      //------------------------
      console.log(cookies.token);
      const response = await fetch(`http://localhost:3000/files`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });

      if (!response.ok) throw new Error("Bad data received");

      const data = await response.json();

      // const fileResponse = fetch(data[0].url);
      // if (!fileResponse.ok) throw new Error("Wrong File Url");
      // const fileBlob = await fileResponse.blob();
    } catch (error) {
      if (error.message === "No Refresh Token") {
        navigate("/login");
      }
      console.error(error);
    }
  });

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <div className={styles.useWrapper}>
      <section className={styles.useSection}>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <div className={styles.app}>
          <h1>Throw Crate</h1>
          <FileBox zipBlob={zipBlob} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default User;
