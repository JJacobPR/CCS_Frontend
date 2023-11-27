import logo from "../../assets/img/logo.svg";
import Footer from "../footer/Footer.jsx";
import FileBox from "./FileBox.jsx";
import styles from "./User.module.scss";
import refreshTokenFunc from "../../helpers/refreshToken.js";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../store/cookieSlice.js";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [zipBlob, updateZipBlob] = useState({});
  const [zipID, updateZipID] = useState("");
  const { token, refreshToken } = useSelector((state) => state.cookies.tokens);

  const loginUser = useCallback(async () => {
    try {
      if (refreshToken === "" && token === "") throw new Error("No Refresh Token");
      if (token === "") {
        await refreshTokenFunc(refreshToken);
        dispatch(update());
        navigate(0);
      }

      const response = await fetch(`http://localhost:3000/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Bad data received");

      const data = await response.json();

      if (!data) throw new Error("No Data");

      const fileResponse = await fetch(data.url);

      if (!fileResponse.ok) throw new Error("Wrong File Url");
      const fileBlob = await fileResponse.blob();
      updateZipID(data._id);
      updateZipBlob(fileBlob);
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
          <FileBox token={token} zipBlob={zipBlob} zipID={zipID} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default User;
