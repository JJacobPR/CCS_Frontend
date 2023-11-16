import { useState, useCallback, useEffect } from "react";
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

  return zip.generateAsync({ type: "blob" });
}

const FileBox = () => {
  const [fileList, updateFileList] = useState([]);
  const [dragActive, updateDragActive] = useState(false);

  const fetchDataInitial = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/files");

      if (!response.ok) throw new Error("Bad data received");
      const data = await response.json();
      
      const fileResponse = await fetch(data[4].url);

      if (!fileResponse.ok) throw new Error("Wrong File Url");


      const fileBlob = await fileResponse.blob();
      const zipFile = new File([fileBlob], "User Data", { type: fileBlob.type });

  
      const files = [];
      const zipContent = await handleZipFile(zipFile);

      zipContent.forEach((relativePath, zipEntry) => {
        zipEntry.async("blob").then((blob) => {
          const n = new File([blob], relativePath, { type: blob.type });
          files.push({ id: nanoid(), file: n });
          updateFileList([...fileList, ...files]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const handleZipFile = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const zip = new JSZip();

        zip
          .loadAsync(file)
          .then((zipContent) => {
            resolve(zipContent);
          })
          .catch((error) => {
            console.error("Error reading zip file:", error);
            reject(error);
          });
      } else {
        reject(new Error("No file provided."));
      }
    });
  };

  const handleFileInput = (e) => {
    handleFile(e.target.files[0]);
  };

  const postChanges = async () => {
    try {
      const zipBlob = await zipFiles(fileList);
      const formData = new FormData();
      formData.append("file", zipBlob, "Test.zip");
      console.log(formData)
      const response = await fetch("http://localhost:3000/files", {
        method: "POST",
        body: formData,
      });

      console.log(response);
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
