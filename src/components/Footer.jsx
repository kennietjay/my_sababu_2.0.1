import Button from "./Button";
import styles from "./Footer.module.css";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <main className={`${"grid gridFourCol"}`}>
        <div className={styles.footerIcons}>
          <img src="/images/sb-logo.png" alt="Sababu Fund logo" />
          <p>
            A community organization providing relief and emotional support to
            its members.
          </p>
          <div className={styles.icons}>
            <HashLink smooth to="/">
              <i className="fa-brands fa-square-facebook"></i>
            </HashLink>
            <HashLink smooth to="/">
              <i className="fa-brands fa-square-whatsapp"></i>
            </HashLink>
          </div>
        </div>
        <div className={styles.navigation}>
          <h3>Navigation</h3>
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
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <ul>
            <li>43244 Winsbury West Pl, Sterling VA. 20166</li>
            <li>Phone: +1 (571)-471-6384</li>
            <li>Email: sababufund@gmail.com</li>
          </ul>
        </div>
        <div className={styles.support}>
          <h3>Support</h3>
          <p>
            You are interested in getting involved, we would love to hear from
            you!
          </p>
          <HashLink smooth to="/membership#top">
            <button type="primary">Join us</button>
          </HashLink>
        </div>
      </main>
      <div className={styles.copyRight}>
        <p>
          Sababu Fund Inc. &copy; 2023.{" "}
          <span className={styles.lastUpdate}>
            Last updated {new Date().toDateString()}.
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
