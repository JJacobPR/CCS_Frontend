import { useState, useCallback, useEffect } from "react";
import style from "./FileBox.module.scss";
import FileItem from "./FileItem.jsx";
import { nanoid } from "nanoid";
import * as JSZip from "JSZip";
import downloadFile from "../../helpers/downloadFile.js";
import handleZipFile from "../../helpers/handleZipFile.js";

//Zipping Files on Upload Click
function zipFiles(fileList) {
  const zip = new JSZip();
  fileList.forEach((file) => {
    zip.file(file.file.name, file.file);
  });

  return zip.generateAsync({ type: "blob" });
}

const FileBox = (props) => {
  const [fileList, updateFileList] = useState([]);
  const [dragActive, updateDragActive] = useState(false);

  const renderFiles = async () => {
    const zipFile = new File([props.zipBlob], "User Data", { type: props.zipBlob.type });
    const files = [];
    const zipContent = await handleZipFile(zipFile);
    zipContent.forEach((relativePath, zipEntry) => {
      zipEntry.async("blob").then((blob) => {
        const fileFromZip = new File([blob], relativePath, { type: blob.type });
        files.push({ id: nanoid(), file: fileFromZip });
        updateFileList([...fileList, ...files]);
      });
    });
  };

  useEffect(() => {
    if (props.zipBlob.size) renderFiles();
  }, [props.zipBlob]);

  const handleFileInput = (e) => {
    handleFile(e.target.files[0]);
  };

  const postChanges = async () => {
    try {
      const zipBlob = await zipFiles(fileList);
      const formData = new FormData();
      formData.append("file", zipBlob, "Data.zip");

      if (!props.zipID) {
        const response = await fetch("http://localhost:3000/files", {
          method: "POST",
          headers: { Authorization: `Bearer ${props.token}` },
          body: formData,
        });
        if (response.ok) alert("Files Successfully Updated");
      } else {
        const response = await fetch(`http://localhost:3000/files/${props.zipID}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${props.token}` },
          body: formData,
        });
        if (response.ok) alert("Files Successfully Updated");
      }
    } catch (error) {
      console.error("Error generating zip file:", error);
    }
  };

  const handleFile = (file) => {
    if (file.size > 20971520) {
      alert("File is too big");
      return;
    }
    updateFileList([...fileList, { id: nanoid(), file }]);
  };

  const removeItem = (removeId) => {
    updateFileList(fileList.filter((file) => file.id !== removeId));
  };

  const dragDrop = (e) => {
    e.preventDefault();
    updateDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  //UI Changes
  const dragEnter = (e) => {
    e.preventDefault();
    updateDragActive(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    updateDragActive(false);
  };

  return (
    <div className={style.fileBoxSection}>
      <div className={style.actions}>
        <div className={style.browse}>
          <p>Drop Items Below or&nbsp;</p>
          <label htmlFor="avatar"> Browse </label>
          <input onChange={handleFileInput} type="file" id="avatar" name="avatar" />
        </div>
        <div className={style.options}>
          <button onClick={postChanges}>Update</button>
          <button>Options</button>
          <button onClick={props.logOut}>Log out</button>
        </div>
      </div>
      <div onDrop={dragDrop} onDragOver={dragEnter} onDragLeave={dragLeave} className={dragActive ? style.fileBox + " " + style.boxDragOver : style.fileBox}>
        <div className={style.files}>
          {fileList.map((file, index) => (
            <FileItem downloadItem={downloadFile} removeItem={removeItem} key={index} fileId={file.id} file={file.file} type={file.file.name.split(".").pop()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileBox;
