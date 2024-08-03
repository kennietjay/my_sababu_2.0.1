import React, { useState } from "react";
import styles from "../pages/Join.module.css";
import supabase from "../../utils/supabase";
import { HashLink } from "react-router-hash-link";

const DownloadFiles = ({ fileUrls }) => {
  const [error, setError] = useState(null);

  const downloadFileFromSupabase = async (bucket, filePath, fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(filePath);

      if (error) {
        setError(`Error downloading file: ${error.message}`);
        return;
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError("Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.downloads}>
      <h1 className="headingSecondary">Sababu Documents</h1>
      {fileUrls.map((file, index) => (
        <div key={index}>
          <h4>{file.fileName}</h4>
          <HashLink
            className={`${"downloadLink"}`}
            onClick={() =>
              downloadFileFromSupabase(
                file.bucket,
                file.filePath,
                file.fileName
              )
            }
          >
            <i className="fa-solid fa-download"></i>
          </HashLink>
        </div>
      ))}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DownloadFiles;

//
//
//
// import Button from "./Button";
// import styles from "../pages/Join.module.css";

// const DownloadFiles = ({ fileUrls }) => {
//   const downloadFile = (fileUrl, fileName) => {
//     const link = document.createElement("a");
//     link.href = fileUrl;
//     link.setAttribute("Registration", fileName);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className={styles.downloads}>
//       <h1 className={`${"headingSecondary"}`}>Sababu Documents</h1>
//       {fileUrls.map((file, index) => (
//         <div key={file.name}>
//           <h4>{file.name}</h4>
//           <Button key={index} onClick={() => downloadFile(file.url, file.name)}>
//             <i className="fa-solid fa-download"></i>
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DownloadFiles;
