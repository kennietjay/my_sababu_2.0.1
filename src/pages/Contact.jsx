import { useState } from "react";
import AppNav from "../components/AppNav";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import MapComponent from "../components/MapComponent";
import NewsLetter from "../components/NewsLetter";
import TextDisplay from "../components/TextDisplay";
import styles from "./Contact.module.css";
import supabase from "../../utils/supabase";
import { submitContactUsForm } from "../../utils/sendEmails";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    setErrorMsg(null);
    setLoading(false);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setErrorMsg(
        "All fields are required; name, phone, email address and a brief message."
      );
      return;
    }

    if (!isValidEmailFormat(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!isRecognizedEmailDomain(formData.email)) {
      setErrorMsg(
        "Please use an email from recognized domains like Gmail, Yahoo, or .org domains."
      );
      return;
    }

    if (!isValidUSPhone(formData.phone)) {
      setErrorMsg("Please enter a valid US phone number.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    const newMessage = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      emailSubject: "Contact Us Confirmation",
      type: "contact",
      templateData: {
        message: formData.message,
        supportLink: "https://example.com/support",
      },
    };

    try {
      const { data: newMessageSaved, error } = await supabase
        .from("contactus")
        .insert(newMessage)
        .select("*");

      await submitContactUsForm(emailData);

      console.log(emailData);

      if (error) throw error;

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <AppNav />
      <div className={styles.contacts}>
        <div className={`${"section"}`}>
          <TextDisplay>{textDisplay}</TextDisplay>
        </div>
        <section className={`${styles.contactOptions}`}>
          <div>
            <ContactDetails />
          </div>
          <div>
            <ContactForm
              formData={formData}
              setFormData={setFormData}
              setErrorMsg={setErrorMsg}
              errorMsg={errorMsg}
              handleChangeInput={handleChangeInput}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </section>
        <section className={styles.googleMap}>
          <MapComponent />
        </section>
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
}

function ContactDetails() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <div className={styles.contactUs}>
        <div className={styles.contactDetails}>
          <div className={styles.address}>
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <p>42344 Winsbury West Pl </p>
              <span>Sterling VA.20166</span>
            </div>
          </div>
          <div className={styles.phone}>
            <i className="fa-solid fa-phone"></i>
            <div>
              <p>+1 (571) - 471 - 6384</p>
              <span>Mon - Fri: 9am - 6pm</span>
            </div>
          </div>
          <div className={styles.email}>
            <i className="fa-regular fa-envelope"></i>
            <div>
              <p>sababufund@gmail.com</p>
              <span>Send us those questions anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

const textDisplay = (
  <p className={styles.volunteerPitch}>
    We are always looking for ways to expand our reach and impact, and we are
    committed to making a difference in the lives of those in need in our
    community and beyond. Interested in getting in rejuvinating someone &apos;s
    live, we would love to hear from you!
  </p>
);

const recognizedEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
];

const isValidEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isRecognizedEmailDomain = (email) => {
  const domain = email.split("@")[1];
  return recognizedEmailDomains.includes(domain) || domain.endsWith(".org");
};

const isValidUSPhone = (phone) => {
  const phoneRegex =
    /^\(?([2-9][0-9]{2})\)?[-.●]?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};
