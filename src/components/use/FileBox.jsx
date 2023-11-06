import { Fragment, useState } from "react";
import style from "./FileBox.module.scss";
import FileItem from "./FileItem.jsx";
import { update } from "immutable";

const FileBox = () => {
  const [fileList, updateFileList] = useState([]);
  const [dragActive, updateDragActive] = useState(false)

  const handleFileInput = (e) => {
    updateFileList([...fileList, e.target.files[0]]);
  };

  const createFormData = () => {
    const formData = new FormData();

    Object.entries(fileList).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const dragEnter = (e) => {
    e.preventDefault();
    updateDragActive(true)
  };

  const dragLeave = (e) => {
    e.preventDefault();
    updateDragActive(false)
  };

  const dragDrop = (e) => {
    console.log("Calling")
    e.preventDefault();
    updateDragActive(false)
    updateFileList([...fileList, e.dataTransfer.files[0]]);
  };

  return (
    <div className={style.fileBoxSection}>
      <div className={style.browse}>
        <p>Drop Items Below or&nbsp;</p>
        <label htmlFor="avatar"> Browse </label>
        <input onChange={handleFileInput} type="file" id="avatar" name="avatar" />
      </div>
      <div onDrop={dragDrop} onDragEnter={dragEnter} onDragLeave={dragLeave} className={dragActive ? style.fileBox + " " + style.boxDragOver  : style.fileBox}>
        <div className={style.files}>
          {fileList.map((file, index) => (
            <FileItem key={index} fileName={file.name} type={file.name.split(".").pop()} fileSize={file.size} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileBox;
