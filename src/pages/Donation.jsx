import React, { useEffect, useState } from "react";
import styles from "./Donation.module.css";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import supabase from "../../utils/supabase";
import { useDonation } from "../contexts/DonationContext";
import { submitDonationForm } from "../../utils/sendEmails";

function Donation() {
  const { getDonation } = useDonation();

  useEffect(() => {
    getDonation();
  }, [getDonation]);

  return (
    <main className={styles.donation}>
      <HeroSection />
      <DonationForm />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <>
      <AppNav />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Support Our Community Initiatives</h1>
          <p>Your generous donations help us make a difference.</p>
        </div>
      </section>
    </>
  );
}

function DonationForm() {
  const { createDonation, checkDonationLimit } = useDonation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    memberType: "Select",
    files: [],
    selectedPayment: "",
    selectedAmount: "",
    customAmount: "",
    goods: "",
    othersChecked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else if (type === "checkbox") {
      if (name === "othersChecked" && checked) {
        // Clear selected amount and payment options when Others is checked
        setFormData({
          ...formData,
          [name]: checked,
          selectedAmount: "",
          customAmount: "",
          selectedPayment: "",
        });
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: checked,
          selectedPayment: checked ? prevFormData.selectedPayment : "", // Uncheck selectedPayment if checkbox is unchecked
        }));
      }
    } else {
      // Handle input changes (text inputs, amount buttons)
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmountChange = (amount) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedAmount: prevFormData.selectedAmount === amount ? "" : amount,
      customAmount: amount === "Custom" ? prevFormData.customAmount : "",
      othersChecked: false,
    }));
  };

  const handleCustomAmountChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      customAmount: value,
      othersChecked: false,
    });
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone
    const { email, phone } = formData;
    const isAllowedToDonate = await checkDonationLimit(email, phone);

    if (!isAllowedToDonate) {
      alert("You can only donate once per day. Please try again later.");
      return;
    }

    // Assuming you have an uploadFiles function
    const uploadedFileUrls = await uploadFiles(formData.files);

    // Determine the donation amount and payment option
    let donationAmount = null;
    let paymentOption = null;
    let donationFiles = null;

    if (!formData.othersChecked) {
      if (formData.selectedAmount === "Custom") {
        donationAmount = formData.customAmount;
      } else if (formData.selectedAmount !== "") {
        donationAmount = formData.selectedAmount;
      }

      paymentOption = formData.selectedPayment;
      donationFiles = uploadedFileUrls;
    }

    // Save references to the registration or members table
    const newDonation = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      amount: donationAmount,
      files: donationFiles,
      payment_option: paymentOption,
      items: formData.goods,
    };

    //Email data
    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      emailSubject: "Donation Confirmation",
      type: "donation",
      templateData: {
        donationAmount: donationAmount,
        itemDonation: formData.goods,
        donationDate: new Date().toLocaleDateString(),
        receiptLink: "https://example.com/receipt",
      },
    };

    try {
      // Check if amount is valid before creating donation
      if (formData.othersChecked || donationAmount !== null) {
        await createDonation(newDonation);
        await submitDonationForm(emailData);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          memberType: "Select",
          files: [],
          selectedPayment: "",
          selectedAmount: "",
          customAmount: "",
          goods: "",
          othersChecked: false,
        });
      } else {
        console.error("Donation amount is empty or invalid.");
        // Handle error or inform the user
      }
    } catch (error) {
      console.error("Error creating donation:", error);
      // Handle error gracefully, log or display specific error messages
    }
  };

  const paymentDetails = {
    Zelle: (
      <div>
        Please Zelle the amount to email address <strong>sababufund.org</strong>
        . Upload screenshot of confirmation screen.
        <input
          type="file"
          id="files"
          name="files"
          accept="image/*,.pdf"
          multiple
          onChange={handleChange}
          required
        />
        <FileList files={formData.files} />
      </div>
    ),
    CashApp: (
      <div>
        <p>
          Please send the CashApp amount to phone number{" "}
          <strong>5714716384</strong>. Upload screenshot of confirmation screen.
        </p>
        <input
          type="file"
          id="files"
          name="files"
          accept="image/*,.pdf"
          multiple
          onChange={handleChange}
          required
        />
        <FileList files={formData.files} />
      </div>
    ),
    Check: (
      <div>
        <p>Please contact us for check and cash donation.</p>
      </div>
    ),
    Bank: (
      <div>
        <p>Please contact us for Bank transactions.</p>
      </div>
    ),
  };

  return (
    <section className="section">
      <div className={styles.donationContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className="headingSecondary">Make a Donation</h2>
          <p>
            Auto transactions and card payment are currently not enabled on this
            site. Please use one of our recommended options below.
          </p>
          <div>
            <div className={styles.formGroup}>
              <label>Donation Amount</label>
              <div className={styles.amountOptions}>
                {[20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 1000].map(
                  (amount) => (
                    <button
                      type="button"
                      key={amount}
                      className={`${styles.amountButton} ${
                        formData.selectedAmount === amount
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleAmountChange(amount)}
                      disabled={formData.othersChecked}
                    >
                      ${amount}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className={`${styles.amountButton} ${
                    formData.selectedAmount === "Custom" ? styles.selected : ""
                  }`}
                  onClick={() => handleAmountChange("Custom")}
                  disabled={formData.othersChecked}
                >
                  Custom
                </button>
              </div>
              {formData.selectedAmount === "Custom" && (
                <input
                  type="number"
                  className={styles.customAmountInput}
                  value={formData.customAmount}
                  onChange={handleCustomAmountChange}
                  name="customAmount"
                  placeholder="Enter amount"
                  required
                />
              )}
            </div>
            <div className={styles.paymentOptions}>
              <h3 className="headingTertiary">Payment Options</h3>
              <div className={styles.paymentOption}>
                <label htmlFor="zelle">Zelle</label>
                <input
                  type="radio"
                  id="zelle"
                  name="selectedPayment"
                  value="Zelle"
                  checked={formData.selectedPayment === "Zelle"}
                  onChange={handleChange}
                  required={!formData.othersChecked}
                  disabled={!formData.selectedAmount || formData.othersChecked}
                />
              </div>
              <div className={styles.paymentOption}>
                <label htmlFor="cashapp">CashApp</label>
                <input
                  type="radio"
                  id="cashapp"
                  name="selectedPayment"
                  value="CashApp"
                  checked={formData.selectedPayment === "CashApp"}
                  onChange={handleChange}
                  required={!formData.othersChecked}
                  disabled={!formData.selectedAmount || formData.othersChecked}
                />
              </div>
              <div className={styles.paymentOption}>
                <label htmlFor="others">Others</label>
                <input
                  type="checkbox"
                  id="others"
                  name="othersChecked"
                  checked={formData.othersChecked}
                  onChange={handleChange}
                  disabled={!!formData.selectedAmount}
                />
              </div>
            </div>
            {formData.selectedPayment && !formData.othersChecked && (
              <div className={styles.paymentDetails}>
                <h4 className={`${"headingTertiary"}`}>
                  {formData.selectedPayment} Details:
                </h4>
                <div>{paymentDetails[formData.selectedPayment]}</div>
              </div>
            )}
            {formData.othersChecked && (
              <div className={styles.inKindDonations}>
                <div className={styles.formGroup}>
                  <label htmlFor="goods">
                    Please provide donation details.
                  </label>
                  <textarea
                    id="goods"
                    name="goods"
                    rows="4"
                    value={formData.goods}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="primary">
            Donate Now
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Donation;

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
      .upload(`donations/${fileName}`, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      throw new Error("File upload failed");
    }

    // Generate the public URL for the uploaded file
    const { data: urlData, error: urlError } = supabase.storage
      .from("sababu_docs")
      .getPublicUrl(`donations/${fileName}`);

    if (urlError) {
      console.error("Error getting public URL:", urlError.message);
      throw new Error("Getting public URL failed");
    }

    return urlData.publicUrl;
  });

  return Promise.all(uploadPromises);
};
