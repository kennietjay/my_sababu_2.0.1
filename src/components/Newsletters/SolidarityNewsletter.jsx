import React from "react";
import styles from "./SolidarityNewsletter.module.css"; // Import the CSS module

const SolidarityNewsletter = () => {
  return (
    <div className={styles.newsletterContainer}>
      <header className={styles.newsletterHeader}>
        <h1>Sababu Fund Newsletter</h1>
        <h2>Showing Solidarity with Grieving Families</h2>
      </header>

      <section className={styles.newsletterIntro}>
        <p>Dear Members, Friends, and Supporters,</p>
        <p>
          In times of loss and grief, the strength of our community is tested,
          but it is also when our compassion shines the brightest. The Sababu
          Fund is committed to standing with families during their most
          challenging moments, providing unwavering support and solidarity.
        </p>
        <p>
          This newsletter is dedicated to all those who have experienced loss
          and to the families who need our collective strength. We want to share
          how the Sababu Fund is making a difference and how you can join us in
          showing solidarity with grieving families.
        </p>
      </section>

      <section className={styles.imageWrapSection}>
        <img
          src="/images/nw_image_1.jpg"
          alt="Solidarity and support"
          className={styles.introImage}
        />
        <div className={styles.textWrap}>
          <p>
            Over the past eight years, what began as a small initiative has
            grown into a significant organization, positively impacting the
            lives of over eight surviving families. Through the dedication of
            our volunteers and commitment to community development, we have
            raised an average of over two thousand dollars for each family that
            has lost a loved one.
          </p>
          <p>
            Our support extends beyond financial aid. We provide comprehensive
            services, including repatriation, transportation, logistics, and
            grief packages, ensuring that families receive the help they need.
            Additionally, we offer both physical and moral support to help
            families cope during their difficult times.
          </p>
          <p>
            The impact of our work is evident in the stories of the families we
            have assisted. Each family’s journey through grief is unique, and we
            tailor our support to meet their specific needs. Our commitment to
            making a difference remains our driving force.
          </p>

          <p>
            As we look to the future, we are committed to expanding our reach
            and enhancing our services. We aim to continue raising awareness and
            garnering support to further our mission. With the community’s
            continued involvement and generosity, we believe we can make an even
            greater impact in the years to come.
          </p>
          <p>
            We extend our deepest gratitude to all our members, supporters,
            volunteers, and donors. Your contributions make a significant
            difference in the lives of those we serve. Together, we can continue
            to uplift and empower grieving families, fostering a sense of
            togetherness and resilience that will carry us forward.
          </p>
        </div>
      </section>

      <section className={styles.highlightSection}>
        <h3>Our Support Initiatives</h3>
        <div className={styles.highlightContainer}>
          <div className={styles.highlightItem}>
            <img
              src="/images/nw_bg_2.jpg"
              alt="Grief packages"
              className={styles.highlightImage}
            />
            <div className={styles.highlightText}>
              <strong>Grief Packages:</strong> As a community, we come together
              to support the surviving family by presenting an envelope of
              contributions to the relatives of the deceased. This gesture not
              only provides financial assistance but also symbolizes our
              collective compassion, solidarity, and unwavering support.
            </div>
          </div>
          <div className={styles.highlightItem}>
            <img
              src="/images/nw_bg_1.jpg"
              alt="Funeral proceedings"
              className={styles.highlightImage}
            />
            <div className={styles.highlightText}>
              <strong>Funeral Proceedings Assistance:</strong> The Sababu Fund
              assists families in organizing and facilitating funeral
              proceedings, ensuring that they can honor their loved ones with
              dignity and respect.
            </div>
          </div>
          <div className={styles.highlightItem}>
            <img
              src="/images/nw_image_4.jpg"
              alt="Counseling services"
              className={styles.highlightImage}
            />
            <div className={styles.highlightText}>
              <strong>Counseling Services:</strong> We offer access to
              counseling services to provide emotional support and guidance to
              grieving families, helping them navigate their journey of healing.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.actionSection}>
        <h3>How You Can Help</h3>
        <div className={styles.actionContainer}>
          <div className={styles.actionItem}>
            <h4>Volunteer</h4>
            <p>
              Offer your time and skills to help us prepare and deliver grief
              packages, assist with funeral proceedings, or provide counseling
              support.
            </p>
          </div>
          <div className={styles.actionItem}>
            <h4>Donate</h4>
            <p>
              Your financial contributions enable us to continue offering these
              critical services to families in need. Consider making a donation
              to the Sababu Fund.
            </p>
          </div>
          <div className={styles.actionItem}>
            <h4>Spread the Word</h4>
            <p>
              Share information about our initiatives with your network. The
              more people who know about our work, the more support we can
              gather for grieving families.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.footerSection}>
        <h3>Looking Ahead</h3>
        <p>
          As we continue our efforts to support grieving families, we are
          grateful for the community's unwavering support. Together, we can
          provide the strength and compassion needed to help families heal.
        </p>
        <p>
          Thank you for standing with us and for your dedication to making a
          difference. Let us continue to uplift each other, showing that even in
          the darkest times, we are never alone.
        </p>
        <p>With heartfelt gratitude,</p>
        <p>
          <strong>Amara T. Jaward</strong>
          <br />
          Director
        </p>
        <p>
          Sababu Fund Inc.
          <br />
          Email: sababufund@gmail.com
          <br />
          Visit us online:{" "}
          <a href="http://www.sababufund.org">www.sababufund.org</a>
        </p>
      </section>
    </div>
  );
};

export default SolidarityNewsletter;
