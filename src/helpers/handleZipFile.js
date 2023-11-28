import * as JSZip from "JSZip";

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

export default handleZipFile;
