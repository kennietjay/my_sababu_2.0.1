import React from "react";
import styles from "./GriefSupport.module.css";
import Footer from "../components/Footer";
import { HashLink } from "react-router-hash-link";

function GriefSupport() {
  return (
    <div className={styles.griefSupportContainer}>
      <header>
        <div className={`${"section"}`}>
          <HashLink to="/services" className={`${styles.backBtn}`}>
            <i className="fa-solid fa-chevron-left"></i>
          </HashLink>
          <h1>Sababu - Funeral Cost Support</h1>
        </div>
      </header>
      <div className={`${"section"} ${styles.griefSupportSection}`}>
        <div className={styles.griefSupport}>
          <div className={styles.overview}>
            <h2 className={"headingSecondary"}>Overview</h2>
            <p>
              Sababu offers support to its members by helping alleviate the
              financial burden of funeral costs. Members contribute when a death
              incident is reported, and the contribution varies based on
              membership type.
            </p>
          </div>
          <div className={styles.supportCategory}>
            <section
              className={`${styles.membersipCategory} ${styles.singleMembership}`}
            >
              <div className={styles.details}>
                <h2>Single Membership</h2>
                <p>
                  For single members without dependents, the contribution is a
                  flat fee of $50.
                </p>
              </div>
              <img src="/images/sb-bbq.jpg" alt="Single Membership" />
              <HashLink
                smooth
                to="/membership#membership_type"
                className="ctaOutline"
              >
                Register Now
              </HashLink>
            </section>
            <section
              className={`${styles.membersipCategory} ${styles.singleFamilyMembership}`}
            >
              <div className={styles.details}>
                <h2>Single Family Membership</h2>
                <p>
                  Single family members pay a base fee of $50, plus $10 for
                  every child aged 1 to 26 years, and $25 for every adult family
                  member in the household.
                </p>
              </div>
              <img
                src="/images/sb-single-family.jpg"
                alt="Single Family Membership"
              />
              <HashLink to="/membership#membership_type" className="ctaOutline">
                Register Now
              </HashLink>
            </section>
            <section
              className={`${styles.membersipCategory} ${styles.familyMembership}`}
            >
              <div className={styles.details}>
                <h2>Family Membership</h2>
                <p>
                  Family members, considered married within the household, pay a
                  base fee of $100, plus $10 per child and $25 per adult family
                  member in the household.
                </p>
              </div>
              <img src="/images/sb-family.jpg" alt="Family Membership" />
              <HashLink to="/membership#membership_type" className="ctaOutline">
                Register Now
              </HashLink>
            </section>

            <section
              className={`${styles.membersipCategory} ${styles.seniorCitizenMembership}`}
            >
              <div className={styles.details}>
                <h2>Senior Citizen(Retired) Membership</h2>
                <p>
                  Senior citizen members pay a base fee of $25, plus $10 per
                  child and $25 per adult in their household.
                </p>
              </div>
              <img
                src="/images/sb-seniors.jpg"
                alt="Senior Citizen Membership"
              />
              <HashLink to="/membership#membership_type" className="ctaOutline">
                Register Now
              </HashLink>
            </section>
          </div>
          <section>
            <p>
              In essence, Sababu's commitment to alleviating the financial
              strain of funeral costs is exemplified through its structured
              contribution system, which takes into account the diverse needs
              and circumstances of its membership base. By offering a range of
              options tailored to different family compositions and life stages,
              Sababu aims to provide meaningful support during moments of
              bereavement, fostering a sense of community and solidarity among
              its members.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GriefSupport;
