import React, { useState } from "react";
import styles from "./Join.module.css";
import Footer from "../components/Footer";
import AppNav from "../components/AppNav";
import Button from "../components/Button";
import DownloadFiles from "../components/DownloadFiles";
import { useApplicant } from "../contexts/ApplicationContext";
import supabase from "../../utils/supabase";
import { submitRegisterForm } from "../../utils/sendEmails";

function Join() {
  const fileUrls = [
    {
      bucket: "public/sababu_docs",
      filePath: "admin/Sababu_Fund_Inc_Registration_Form_001.pdf",
      fileName: "Sababu Fund Registration Form",
    },
    {
      bucket: "public/sababu_docs",
      filePath: "admin/Sababu_Fund_Inc_By_Laws_2022.docx",
      fileName: "Sababu Fund Constitution/By-Laws",
    },
    // Add more files as needed
  ];

  return (
    <>
      <div className={styles.pageLayout}>
        <AppNav />
        <div className={styles.header}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.suspendedDiv}>
            <SababuDocuments />
          </div>
        </div>
        <div className={styles.downloadContainer}>
          <DownloadFiles fileUrls={fileUrls} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Join;

function SababuDocuments() {
  const { createApply } = useApplicant();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    memberType: "Select",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: [...prevFormData.files, ...filesArray],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const uploadedFiles = await uploadFiles(formData.files);
      const uploadedFileUrls = await uploadFiles(formData.files);

      // Save references to the registration or members table
      const newApplicant = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        member_type: formData.memberType,
        files: uploadedFileUrls,
      };

      const emailData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        emailSubject: "Registration Confirmation",
        type: "register",
        templateData: {
          registrationDate: new Date().toLocaleDateString(),
          welcomeLink: "https://example.com/welcome",
        },
      };

      await createApply(newApplicant);
      await submitRegisterForm(emailData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        memberType: "Select",
        files: [],
      });
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <main className={styles.formHandler}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Sign up for membership</h1>
          <p>
            Download the registration form below and upload them after filling
            out.
          </p>
        </div>
      </section>
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.uploadContainer}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="email">
                Email Address:
                <input
                  type="text"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="phone">
                Phone Number:
                <input
                  type="text"
                  value={formData.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </label>

              <div className={styles.formGroup}>
                <label htmlFor="memberType">
                  Member Type:
                  <select
                    id="memberType"
                    name="memberType"
                    value={formData.memberType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Single-Family">Single-Family</option>
                    <option value="Family">Family</option>
                    <option value="Senior-Citizen">Senior-Citizen</option>
                  </select>
                </label>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="files">
                  Upload Files (Image and PDF):
                  <input
                    type="file"
                    id="files"
                    name="files"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileChange}
                    // required
                  />
                </label>
                <FileList files={formData.files} />
              </div>
              <Button type="primary">Register</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function FileList({ files }) {
  return (
    <div className={styles.fileList}>
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

//
const uploadFiles = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("sababu_docs")
      .upload(`uploads/${fileName}`, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      throw new Error("File upload failed");
    }

    // console.log("Upload data:", data); // Debugging log

    // Generate the public URL for the uploaded file
    const { data: urlData, error: urlError } = supabase.storage
      .from("sababu_docs")
      .getPublicUrl(`uploads/${fileName}`);

    if (urlError) {
      console.error("Error getting public URL:", urlError.message);
      throw new Error("Getting public URL failed");
    }

    return urlData.publicUrl;
  });

  return Promise.all(uploadPromises);
};
