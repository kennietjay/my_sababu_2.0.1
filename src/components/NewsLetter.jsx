import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./NewsLetter.module.css";
import { HashLink } from "react-router-hash-link";
import { useSubscriber } from "../contexts/SubscribersContext";
import { Alert } from "react-bootstrap";
import supabase from "../../utils/supabase";
import { submitNewsletterForm } from "../../utils/sendEmails";

function NewsLetter() {
  const { loadSubscribers, createSubscriber } = useSubscriber();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    loadSubscribers();
  }, [loadSubscribers]);

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg(null);
    setLoading(false);

    if (!formData.email || !formData.name) {
      setErrorMsg("All fields are required, full name and email.");
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

    setErrorMsg("");
    setLoading(true);

    const newSubscriber = {
      name: formData.name,
      email: formData.email,
    };

    const emailData = {
      email: formData.email,
      name: formData.name,
      emailSubject: "Newsletter Sign-Up Confirmation",
      type: "newsletter",
      templateData: {
        subscriptionDate: new Date().toLocaleDateString(),
        newsletterLink: "https://example.com/newsletter",
      },
    };

    //
    try {
      const { data: existingSubscriber, error: existingSubscriberError } =
        await supabase
          .from("newslettersignups")
          .select("*")
          .or(`email.eq.${formData.email}`);

      if (existingSubscriberError) throw existingSubscriberError;

      if (existingSubscriber && existingSubscriber.length > 0) {
        setErrorMsg("Email already subscribed.");
        setLoading(false);
        return false;
      }

      await createSubscriber(newSubscriber);
      await submitNewsletterForm(emailData);

      //
      setFormData({ name: "", email: "" });
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="section sectionLayout">
      <div className={styles.newsLetterContent}>
        <p className="intro">News letter</p>
        <h1 className="headingSecondary">Subscribe to our News Letter</h1>
        <div className={`gridNewsLetter ${styles.newsLetter}`}>
          <form onSubmit={handleSubmit}>
            <div className={styles.alertBox}>
              {errorMsg && (
                <Alert
                  variant="warning"
                  dismissible
                  onClose={() => setErrorMsg("")}
                >
                  {errorMsg}
                </Alert>
              )}
            </div>
            <div className="inputControl">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeInput}
                  required
                />
              </div>
            </div>
            <div className="inputControl">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeInput}
                  required
                />
              </div>
            </div>
            <div className={styles.btnSubscribe}>
              <Button type="primary" disabled={loading}>
                Subscribe
              </Button>
            </div>
          </form>
          <div className="listLinks">
            <h3 className="headingTertiary">Quick Links</h3>
            <ul className={styles.navList}>
              <li>
                <HashLink smooth to="/">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/about#top">
                  About
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/services#top">
                  Services
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/home#events">
                  Events
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/home#blogs">
                  Blogs
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/contacts#top">
                  Contact
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;

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
