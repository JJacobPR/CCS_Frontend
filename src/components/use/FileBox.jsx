import { Fragment, useState } from "react";
import style from "./FileBox.module.scss";
import FileItem from "./FileItem.jsx";

const FileBox = () => {
  const [fileList, updateFileList] = useState([]);

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
    e.target.className = `${e.target.className} ${style.boxDragOver}`;
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.target.className = e.target.className.replace(style.boxDragOver, "").trim();
  };

  const dragDrop = (e) => {
    e.preventDefault();
    updateFileList([...fileList, e.dataTransfer.files[0]]);
  };

  return (
    <Fragment>
      <div className={style.browse}>
        <p>Drop Items Below or&nbsp;</p>
        <label htmlFor="avatar"> Browse </label>
        <input onChange={handleFileInput} type="file" id="avatar" name="avatar" />
      </div>
      <div onDrop={dragDrop} onDragEnter={dragEnter} onDragLeave={dragLeave} className={style.fileBox}>
        <div className={style.files}>
          {fileList.map((file, index) => (
            <FileItem key={index} fileName={file.name} type={file.name.split(".").pop()} fileSize={file.size} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default FileBox;
