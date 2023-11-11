import { useState } from "react";
import style from "./FileBox.module.scss";
import FileItem from "./FileItem.jsx";
import { nanoid } from "nanoid";
import * as JSZip from "JSZip";

//Download File
function saveBlob(blob, fileName) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

//Zipping Files on Upload Click
function zipFiles(fileList) {
  const zip = new JSZip();

  fileList.forEach((file) => {
    zip.file(file.file.name, file.file);
  });

  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveBlob(blob, "Test.zip");
  });
}

function handleZipFile(file) {
  if (file) {
    const zip = new JSZip();

    zip
      .loadAsync(file)
      .then((zipContent) => {
        // Access the contents of the zip file
        zipContent.forEach((relativePath, zipEntry) => {
          zipEntry.async("blob").then((blob) => {
            const filez = new File([blob], relativePath, { type: blob.type });
          });
        });
      })
      .catch((error) => {
        console.error("Error reading zip file:", error);
      });
  }
}

const FileBox = () => {
  const [fileList, updateFileList] = useState([]);
  const [dragActive, updateDragActive] = useState(false);

  const handleFileInput = (e) => {
    handleFile(e.target.files[0]);
  };

  const createFormData = () => {
    const formData = new FormData();

    Object.entries(fileList).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const postChanges = () => {
    zipFiles(fileList);
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

  const dragEnter = (e) => {
    e.preventDefault();
    updateDragActive(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    updateDragActive(false);
  };

  const dragDrop = (e) => {
    e.preventDefault();
    updateDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={style.fileBoxSection}>
      <div className={style.actions}>
        <div className={style.browse}>
          <p>Drop Items Below or&nbsp;</p>
          <label htmlFor="avatar"> Browse </label>
          <input onChange={handleFileInput} type="file" id="avatar" name="avatar" />
        </div>
        <button onClick={postChanges}>Update</button>
      </div>
      <div onDrop={dragDrop} onDragOver={dragEnter} onDragLeave={dragLeave} className={dragActive ? style.fileBox + " " + style.boxDragOver : style.fileBox}>
        <div className={style.files}>
          {fileList.map((file, index) => (
            <FileItem downloadItem={saveBlob} removeItem={removeItem} key={index} fileId={file.id} file={file.file} type={file.file.name.split(".").pop()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileBox;
