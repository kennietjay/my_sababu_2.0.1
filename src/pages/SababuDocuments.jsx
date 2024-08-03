import React, { useState } from "react";
import styles from "./SababuDocuments.module.css";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import Button from "../components/Button";

function FormHandler() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Secure direct download link for the file on Google Drive
  const fileUrl =
    "https://drive.google.com/uc?export=download&id=1TXF9xh6WBOeCA4SPBC7x0aqwh1imqQ8z";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "registration_form.pdf"); // You can set the default name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("https://your-server.com/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <main className={styles.formHandler}>
      <AppNav />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Download and Upload Forms</h1>
          <p>Download the necessary forms and upload them after filling out.</p>
        </div>
      </section>
      <section className={styles.instructionsSection}>
        <h2>How to Register</h2>
        <ol>
          <li>Download the registration form.</li>
          <li>
            Complete the registration form, checking or filling out all sections
            that apply to you and your household.
          </li>
          <li>Scan the document and save it on your device (computer).</li>
          <li>Use Zelle or CashApp to pay your registration fee of $50.</li>
          <li>Take a screenshot of the transaction confirmation page.</li>
          <li>
            Complete the online form on this site, attach your registration form
            and payment confirmation screenshot, and submit the form.
          </li>
        </ol>
      </section>
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <Button onClick={handleDownload} className="primary">
            Download Form
          </Button>
          <div className={styles.uploadContainer}>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleFileUpload} className="primary">
              Upload Form
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default FormHandler;
