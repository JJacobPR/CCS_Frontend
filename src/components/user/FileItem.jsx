import styles from "./FileItem.module.scss";
import useImage from "../hooks/useImage";
import trashIcon from "../../assets/img/icons8-trash.svg";
import basicImg from "../../assets/img/fileImg/dummy.png";

const FileItem = (props) => {
  const img = useImage(props.type);

  const trashClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.removeItem(props.fileId);
  };

  return (
    <div onDoubleClick={() => props.downloadItem(props.file, props.file.name)} className={styles.fileItem}>
      <div className={styles.imgWrapper}>
        <img src={img.image ? img.image : basicImg} />
      </div>
      <div className={styles.fileDesc}>
        <p>Name: {props.file.name.length < 20 ? props.file.name : props.file.name.slice(0, 20) + "..."}</p>
        <p>Size: {(props.file.size / 1024 ** 2).toFixed(3)}mb</p>
      </div>
      <img onDoubleClick={trashClick} className={styles.trashIcon} src={trashIcon} />
    </div>
  );
};

export default FileItem;
