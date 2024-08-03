import styles from "./Outreach.module.css";
import Footer from "../components/Footer";
import { HashLink } from "react-router-hash-link";

function Outreach() {
  return (
    <div>
      <div className={` ${styles.outreach}`}>
        <header>
          <h2 className="headingPrimary">
            Sababu Community Outreach Initiatives
          </h2>
        </header>
        <nav className={` ${styles.outreachNav}`}>
          <div className={`${"section"}`}>
            <HashLink to="/services" className={styles.backBtn}>
              <i className="fa-solid fa-chevron-left"></i>
            </HashLink>
            <ul>
              <li>
                <HashLink smooth to="#overview">
                  Overview
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#initiatives">
                  Initiatives
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#partnerships">
                  Partnerships
                </HashLink>
              </li>
            </ul>
          </div>
        </nav>
        <section id="overview" className={`${"section"}`}>
          <h2 className="headingPrimary">Overview</h2>
          <p>
            In a world often marked by individualism and disconnectedness,
            Sababu stands out as a beacon of hope, actively engaging in
            community outreach initiatives aimed at fostering unity and
            solidarity among its members. At the heart of Sababu's mission lies
            a deep commitment to building a compassionate community network—one
            that not only provides support during times of grief but also serves
            as a platform for shared experiences, understanding, and connection.
          </p>
          <img
            className={styles.outreachImg}
            src="/images/sb-agm-members1-2023.jpg"
            alt=""
          />
        </section>
        <section id="initiatives" className="section">
          <h2 className="headingSecondary">Community Initiatives</h2>
          <p>
            Through a variety of outreach initiatives, Sababu works tirelessly
            to unite community members and foster a sense of belonging. Whether
            through support groups, online forums, or local events, Sababu
            provides platforms for individuals to connect, share, and heal
            together. These initiatives not only offer practical support and
            guidance but also serve as powerful reminders that no one is alone
            in their journey through grief.
          </p>
          <img
            className={styles.outreachImg}
            src="/images/background.jpg"
            alt=""
          />
        </section>
        <section id="partnerships" className="section">
          <h2 className="headingSecondary">Community Partnerships</h2>
          <p>
            Moreover, Sababu's commitment to community extends beyond just its
            members. Through partnerships with local organizations, schools, and
            businesses, Sababu seeks to promote a culture of empathy and support
            within the broader community. By raising awareness about the
            importance of grief support and destigmatizing conversations around
            loss, Sababu hopes to create a more compassionate society where
            everyone feels seen, heard, and valued.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Outreach;
