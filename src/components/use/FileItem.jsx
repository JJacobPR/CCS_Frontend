import styles from "./FileItem.module.scss";
import useImage from "../hooks/useImage";

const FileItem = (props) => {
  const img = useImage(props.type);
  return (
    <div className={styles.fileItem}>
      <div className={styles.imgWrapper}>
        <img src={img.image} />
      </div>
      <div className={styles.fileDesc}>
        <p>Name: {props.fileName}</p>
        <p>Size: {(props.fileSize / 1024 ** 2).toFixed(3)}mb</p>
      </div>
    </div>
  );
};

export default FileItem;
