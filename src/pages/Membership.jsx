import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "./Membership.module.css";
import AppNav from "../components/AppNav";
import { HashLink } from "react-router-hash-link";
import Popup from "../components/Popup";
import { downloadFile } from "../../utils/fileDownloader";

function Membership() {
  return (
    <>
      <AppNav />
      <div className={` ${styles.newMembership}`}>
        <HeaderNewMember />
        <JoinReason />
        <HowItWorks />
        <MembershipEligibilty />
        <ApplicationRequirement />
        <MembershipType />
        <DependentRate />
      </div>
      <Footer />
    </>
  );
}

export default Membership;

function HeaderNewMember() {
  return (
    <div className={styles.headerContainer}>
      <div className={`${"section"} ${styles.headerSection}`}>
        <div>
          <h2 className={`${"headingSecondary"}`}>Become a Member</h2>
          <p>
            Membership in the Sababu Fund is an inclusive opportunity available
            to all Sierra Leoneans living in the diaspora, reflecting our
            commitment to unity and engagement across borders. While our current
            focus centers on residents of the United States of America, we
            aspire to expand our outreach globally, welcoming individuals from
            diverse geographic locations to join our mission of positive impact
            and community empowerment.
          </p>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const [error, setError] = useState(null);

  const handleDownloadSingleFile = async () => {
    const result = await downloadFile(
      "public/sababu_docs",
      "admin/Sababu_Fund_Inc_Registration_Form_001.pdf",
      "Sababu_Fund_Inc_Registration_Form_001.pdf"
    );

    if (!result.success) {
      setError(result.error);
    }
  };

  //
  return (
    <section className={`${"section sectionLayout"} ${styles.howItWorks}`}>
      <div className={` ${styles.content}`}>
        <h1 className={`${"headingSecondary"}`}>How it works</h1>
        <div className={`${styles.steps}`}>
          <div className={styles.step}>
            <i className="fa-regular fa-registered"></i>
            <h3 className={`${"headingTertiary"}`}>Register</h3>
            <ul className={styles.stepList}>
              <li>
                Obtain membership application form from Sababu Fund.
                <HashLink
                  onClick={handleDownloadSingleFile}
                  className={`${"downloadLink"}`}
                >
                  Application form <i className="fa-solid fa-download"></i>
                </HashLink>
                {error && <p>Error: {error}</p>}
              </li>
              <li>Complete form and submit to Sababu.</li>
              <li>
                Sababu team reviews and processes the application, and applicant
                receives notification of the decision.
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <i className="fa-regular fa-handshake"></i>
            <h3 className={`${"headingTertiary"}`}>Membership</h3>
            <ul className={styles.stepList}>
              <li>
                No regular monthly dues; contribute only in the event of a
                reported incident.
              </li>
              <li>
                Renew your membership within the designated renewal period.
              </li>
              <li>
                Participate in the organization&apos;s biannual meetings, held
                semi-annually.
              </li>
              <li>
                Get involved in Sababu&apos;s initiatives, projects, and offer
                your time and expertise.
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <i className="fa-regular fa-money-bill-1"></i>
            <h3 className={`${"headingTertiary"}`}>Contribute Dues</h3>
            <ul className={styles.stepList}>
              <li>
                Ensure that bereavement contributions are promptly paid,
                typically within one week of reporting an event.
              </li>
              <li>
                A dedicated team contacts members to collect these
                contributions.
              </li>
              <li>The amount contributed depends on the type of membership.</li>
              <li>
                Funds gathered from members are allocated to assist with funeral
                expenses and other survivor-related costs.
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <i className="fa-regular fa-heart"></i>
            <h3 className={`${"headingTertiary"}`}>Help Others</h3>
            <ul className={styles.stepList}>
              <li>
                volunteer and display your dedication to the organization by
                offering your assistance to fellow community members.
              </li>
              <li>
                Keep yourself informed about the organization&apos;s events,
                meetings, and any alterations in its policies.
              </li>
              <li>
                Familiarize yourself with fellow members, volunteers, and
                leaders, cultivating connections that bolster your sense of
                belonging and impact.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MembershipEligibilty() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.membershipEligibiltyContainer}>
      <div
        id="eligibility"
        className={`${"section"} ${styles.membershipElgibility}`}
      >
        <h2 className={`${"headingSecondary"}`}>Who can join</h2>
        <p>
          In order to gain membership into the Sababu Fund, prospective members
          must satisfy one of the specified conditions outlined by the
          organization. This requirement ensures that individuals seeking
          membership meet certain predefined criteria set forth by the fund. By
          meeting at least one of these categories, individuals demonstrate
          their eligibility and commitment to the objectives and values upheld
          by the Sababu Fund. This approach ensures that membership is granted
          to those who align with the fund's mission and are poised to
          contribute positively to its initiatives.
        </p>
        <div className={styles.eligibiltyCategories}>
          <div className={styles.eligibilityCategory}>
            <i className="fa-solid fa-font-awesome"></i>
            <div>
              <h3 className={`${"headingTertiary"}`}>Nationality</h3>
              <p>Sierra Leonean by birth or dual citizen of Sierra Leone.</p>
              <div>
                <Popup
                  label={
                    <div className={styles.label}>
                      <span>
                        View More <i className="fa-solid fa-chevron-right"></i>
                      </span>
                    </div>
                  }
                  content={
                    <div className={styles.popupContent}>
                      <h3 className={`${"headingTertiary"}`}>
                        Eligibilty by Nationality
                      </h3>
                      <p>
                        Individuals who are either citizens of Sierra Leone or
                        hold dual citizenship involving Sierra Leone are
                        eligible for the specified status. This designation
                        encompasses individuals who possess citizenship solely
                        from Sierra Leone as well as those who hold citizenship
                        from Sierra Leone alongside citizenship from another
                        country. This provision ensures that individuals with
                        ties to Sierra Leone, whether through birth, ancestry,
                        or naturalization, are included within the defined scope
                        of eligibility.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.eligibilityCategory}>
            <i className="fa-solid fa-dna"></i>
            <div>
              <h3 className={`${"headingTertiary"}`}>Heritage or Origin</h3>
              <p>
                Ancestral connection and heritage from Sierra Leone parents.
              </p>
              <div>
                <Popup
                  label={
                    <div className={styles.label}>
                      <span>
                        View More <i className="fa-solid fa-chevron-right"></i>
                      </span>
                    </div>
                  }
                  content={
                    <div className={styles.popupContent}>
                      <h3 className={`${"headingTertiary"}`}>
                        Eligibilty by Heritage
                      </h3>
                      <p>
                        Individuals who can trace their heritage to Sierra Leone
                        through their parents are eligible for membership based
                        on this criterion. This provision acknowledges
                        individuals who, while they may not hold Sierra Leonean
                        citizenship themselves, have familial ties to the
                        country through their parents' heritage. By extending
                        membership eligibility to those who claim Sierra Leonean
                        heritage from their parents, the organization
                        acknowledges and values the cultural and ancestral
                        connections that individuals maintain with Sierra Leone.
                        This criterion underscores the importance of familial
                        lineage and heritage in determining eligibility for
                        membership, recognizing the significance of ancestral
                        ties in fostering a sense of belonging and identity
                        within the organization's community.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.eligibilityCategory}>
            <i className="fa-solid fa-ring"></i>
            <div>
              <h3 className={`${"headingTertiary"}`}>Membership by Married</h3>
              <p>Foreign national that is married to Sierra Leonean.</p>
              <div>
                <Popup
                  label={
                    <div className={styles.label}>
                      <span>
                        View More <i className="fa-solid fa-chevron-right"></i>
                      </span>
                    </div>
                  }
                  content={
                    <div className={styles.popupContent}>
                      <h3 className={`${"headingTertiary"}`}>
                        Eligibilty by Marriage
                      </h3>
                      <p>
                        Foreign nationals who are married to Sierra Leonean
                        citizens are also eligible for membership under this
                        criterion. This provision extends membership eligibility
                        to individuals who, through marriage, have established
                        significant ties to Sierra Leonean citizens and the
                        country itself. By recognizing the marital connection to
                        a Sierra Leonean spouse, the organization acknowledges
                        the close familial and personal bonds that individuals
                        have with Sierra Leone. This criterion emphasizes the
                        importance of familial relationships and partnerships in
                        fostering connections to Sierra Leonean culture,
                        society, and community. Through this provision, the
                        organization seeks to include spouses of Sierra Leonean
                        citizens in its membership, acknowledging their integral
                        role in the Sierra Leonean community and promoting a
                        sense of unity and inclusivity within the organization.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.eligibilityCategory}>
            <i className="fa-regular fa-handshake"></i>
            <div>
              <h3 className={`${"headingTertiary"}`}>Affiliate Membership</h3>
              <p>
                Membersip extended to other nationals by affiliation.
                Application under this category is subject to approval by board.
              </p>
              <div>
                <Popup
                  label={
                    <div className={styles.label}>
                      <span>
                        View More <i className="fa-solid fa-chevron-right"></i>
                      </span>
                    </div>
                  }
                  content={
                    <div className={styles.popupContent}>
                      <h3 className={`${"headingTertiary"}`}>
                        Eligibilty by Affiliation
                      </h3>
                      <p>
                        Membership is also open to individuals of other
                        nationalities through affiliation with the organization.
                        Prospective members seeking membership under this
                        category must submit an application, which is then
                        subject to review and approval by the board of
                        directors. This provision allows for the inclusion of
                        individuals who may not be Sierra Leonean citizens but
                        have affiliations or connections with the organization,
                        its mission, or its activities. The board's approval
                        process ensures that individuals joining under this
                        category align with the organization's values and goals,
                        contributing positively to its community and objectives.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.membershipBtnContainer}>
          <HashLink
            smooth
            to="#membership_type"
            className="ctaOutline memberType"
          >
            <span>Member Type</span>{" "}
            <i className="fa-solid fa-chevron-down"></i>
          </HashLink>
        </div>
      </div>
    </div>
  );
}

function JoinReason() {
  return (
    <div
      className={`${styles.joinReasonContainer} ${styles.clipArt}
      `}
    >
      <div className={`${"section"} ${styles.whyJoin}`}>
        <h2 className={`${"headingSecondary"}`}>
          <strong>Why Join Sababu Fund?</strong>
        </h2>
        <p>
          Members join a family that offers the chance to make a positive
          impact, find personal fulfillment, develop valuable relationship,
          build meaningful connections, and contribute to a greater good through
          flexible, creative, and community-driven work.
        </p>
      </div>
      <div className={styles.clipArtImg}>
        <img
          src="/images/sb-2023-agm-members-7.jpg"
          alt="Four Sababu Fund members posing for a group picture at the 2023 AGM"
        />
      </div>
    </div>
  );
}

function ApplicationRequirement() {
  const [error, setError] = useState(null);

  const handleDownloadSingleFile = async () => {
    const result = await downloadFile(
      "public/sababu_docs",
      "admin/Sababu_Fund_Inc_Registration_Form_001.pdf",
      "Sababu_Fund_Inc_Registration_Form_001.pdf"
    );

    if (!result.success) {
      setError(result.error);
    }
  };
  return (
    <div className={`${"section"} ${styles.requiredTool}`}>
      <h2 className={`${"headingSecondary"}`}>What You Need To Join</h2>
      <div className={styles.requiredTooContent}>
        <div>
          <p>
            Beyond the aforementioned categories, applicants are required to
            meet or possess the following minimum requirements upon application.
          </p>

          <ul>
            <li>You are at least 18 years old.</li>
            <li>Has legal residency in the United States of America.</li>
            <li>
              Has a verifiable government issued identification(drivers license,
              passport).
            </li>
            <li>Has a Social Security number.</li>
            <li>Has a verifiable source of income.</li>
            <li>A fixed $50 non-refundable registration fee.</li>
          </ul>
        </div>
        <div className={styles.requiredTooIcons}>
          <i className="fa-solid fa-list-check"></i>
        </div>
      </div>
      <p>
        Persons under the age 26 years may be admitted under parental account
        and treated as dependent(s).
      </p>

      <div className={styles.applicationSteps}>
        <h3>
          Join us
          <span className={`${styles.underlined} ${styles.underlineClip}`}>
            Today!
          </span>
          <br /> In Just{" "}
          <span className={`${styles.underlined} ${styles.underlineMask}`}>
            Few
          </span>{" "}
          <br />
          <span className={`${styles.underlined} ${styles.underlineOverflow}`}>
            Steps.
          </span>
        </h3>

        <ul className={styles.applicationStepsList}>
          <li>
            {" "}
            <i className="fa-solid fa-chevron-right"></i>
            <div>
              <p>
                Download the membership form here:{" "}
                <HashLink onClick={handleDownloadSingleFile}>
                  Application form. <i className="fa-solid fa-download"></i>
                </HashLink>
              </p>
            </div>
          </li>
          <li>
            {" "}
            <i className="fa-solid fa-chevron-right"></i>
            <div>
              <p>
                Complete or fill out the form as it may apply to you and your
                household.
              </p>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-chevron-right"></i>
            <div className={styles.insideListContainer}>
              <p>Pay your registration fee ($50). </p>
              <div>
                <p>
                  You can Zelle this amount to{" "}
                  <strong>sababufund@gmail.com</strong>. Contact us for other
                  options.
                </p>
              </div>
            </div>
          </li>
          <li>
            {" "}
            <i className="fa-solid fa-chevron-right"></i>
            <div className={styles.insideListContainer}>
              <p>
                Mail in completed form to the head of recruitment and
                membership.
              </p>
              <div>
                <p>
                  Hassan K. Kamara Address:{" "}
                  <strong>
                    2559 Farmcrest Drive Apt 1021, Herndon VA. 20171.
                  </strong>
                </p>
                <p>
                  You may as well scan and email the form to:
                  <strong> sababufund@gmail.com</strong>
                </p>
                <p>
                  You may give complete form to any Sababu Fund executive
                  member.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function MembershipType() {
  return (
    <div className={styles.membershipTypeContainer}>
      <div
        id="membership_type"
        className={`${"section"} ${styles.membershipTypeSection}`}
      >
        <h2 className={`${"headingSecondary"}`}>Membership Type</h2>
        <div>
          <p>
            The Sababu Fund offers membership categories tailored to individual
            family structures or household types, accommodating the specific
            needs of each prospective member.
          </p>
        </div>
        <ul className={styles.membershipTypes}>
          <li className={styles.membershipType}>
            <div className={styles.membershipTypeHeader}>
              <h2 className={`{"headingTertiary"}`}>Single</h2>
              <p>
                Member type for young adults who are single and without
                dependents.
              </p>
            </div>

            <ul className={styles.requirementList}>
              <li>18 years or older</li>
              <li>US legal resident</li>
              <li>Has social security number</li>
              <li className={styles.listException}>Is married</li>
              <li className={styles.listException}>
                Has dependent(s) such as
                <ul className={styles.requirementSubList}>
                  <li className={styles.listException}>Parent(s)</li>
                  <li className={styles.listException}>Relative(s)</li>
                  <li className={styles.listException}>Has children</li>
                </ul>
              </li>
            </ul>
            <HashLink to="/contacts#top" className="ctaOutline">
              Sign up
            </HashLink>
            {/* <HashLink to="/home/join-now#top" className="ctaOutline">
              Sign up
            </HashLink> */}
          </li>

          <li className={`${styles.membershipType} ${styles.familyType}`}>
            <div className={styles.typeName}>
              <div className={styles.membershipTypeHeader}>
                <h2 className={`{"headingTertiary"}`}>Family</h2>
                <p>
                  Ideal membership for married applicants, whether they have
                  dependents or not.
                </p>
              </div>
            </div>

            <ul className={styles.requirementList}>
              <li>18 years or older</li>
              <li>US legal resident</li>
              <li>Has social security number</li>
              <li>Is married</li>
              <li>
                Whether or not the applicant has dependents, such as
                <ul className={styles.requirementSubList}>
                  <li>Children</li>
                  <li>Relative(s)</li>
                  <li>Parent(s)</li>
                </ul>
              </li>
            </ul>
            <HashLink to="/contacts#top" className="ctaOutline">
              Sign up
            </HashLink>
            {/* <HashLink to="/home/join-now#top" className="ctaOutline">
              Sign up
            </HashLink> */}
          </li>

          <li className={styles.membershipType}>
            <div className={styles.typeName}>
              <div className={styles.membershipTypeHeader}>
                <h2 className={`{"headingTertiary"}`}>Single Family</h2>
                <p>
                  Recommended for single parent household who has dependent(s).
                </p>
              </div>
            </div>

            <ul className={styles.requirementList}>
              <li>18 years or older</li>
              <li>US legal resident</li>
              <li>Has social security number</li>
              <li className={styles.listException}>Is Married</li>
              <li>
                Has dependent(s) such as
                <ul className={styles.requirementSubList}>
                  <li>Children </li>
                  <li>Parent(s)</li>
                  <li>Relative(s)</li>
                </ul>
              </li>
            </ul>
            <HashLink to="/contacts#top" className="ctaOutline">
              Sign up
            </HashLink>
            {/* <HashLink to="/home/join-now#top" className="ctaOutline">
              Sign up
            </HashLink> */}
          </li>

          <li className={styles.membershipType}>
            <div className={styles.typeName}>
              <div className={styles.membershipTypeHeader}>
                <h2 className={`{"headingTertiary"}`}>Senior Citizen</h2>
                <p>
                  Perfect for individuals who have reached retirement age,
                  whether married or not.
                </p>
              </div>
            </div>
            <ul className={styles.requirementList}>
              <li>67 years or older</li>
              <li>US legal resident</li>
              <li>Has social security number</li>
              <li>Married or not</li>
              <li>
                Whether or not the applicant has dependents, such as
                <ul className={styles.requirementSubList}>
                  <li>Children</li>
                  <li>Relative(s)</li>
                  <li>Parent(s)</li>
                </ul>
              </li>
            </ul>
            <HashLink to="/contacts#top" className="ctaOutline">
              Sign up
            </HashLink>
            {/* <HashLink to="/home/join-now#top" className="ctaOutline">
              Sign up
            </HashLink> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

function DependentRate() {
  return (
    <div className={styles.dependentRateContainer}>
      <div className={`${"section"} ${styles.dependentRate}`}>
        <h2 className={`${"headingSecondary"}`}>Dependent Policy</h2>
        <p>
          For individuals enrolled under the <strong>Single membership</strong>{" "}
          category and without dependents, a flat contribution of $50 is
          contributed. This straightforward approach ensures that even those
          without familial obligations are able to participate in the support
          network offered by Sababu during times of loss.
        </p>
        <p>
          In contrast, <strong>Single Family memberships</strong> are tailored
          to accommodate households with dependents. Under this arrangement, a
          base fee of $50 is established, with additional contribution of $10
          per child aged 1 to 26 years, and $25 for each adult family member
          within the household. This nuanced structure reflects the
          understanding that familial compositions can vary widely, and the
          financial contribution should correspondingly adjust to these
          differences.
        </p>
        <p>
          <strong>Family memberships</strong>, designed for those considered
          married within their household, operate under a similar yet expanded
          contribution model. Here, a base payment of $100 is required, with
          incremental charges of $10 per child and $25 per adult family member
          included in the household. This setup acknowledges the increased
          responsibilities and financial commitments often associated with
          married life and adjusts the contribution requirements accordingly.
        </p>
        <p>
          Moreover, Sababu extends its support to{" "}
          <strong>Senior Citizen</strong> members with a tailored contribution
          scheme. Senior citizens are asked for a base payment of $25, with
          additional charges of $10 per child and $25 per adult residing in
          their household. Recognizing the unique circumstances and potentially
          fixed incomes of this demographic, Sababu strives to ensure that
          financial support remains accessible and equitable for all members,
          regardless of age or family status.
        </p>
      </div>
    </div>
  );
}
