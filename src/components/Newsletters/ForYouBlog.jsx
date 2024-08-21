import React from "react";
import styles from "./ForYouBlog.module.css"; // Import the CSS module

const ForYouBlog = () => {
  return (
    <div className={styles.blogContainer}>
      <header className={styles.blogHeader}>
        <h1>Sababu Fund for Your Family</h1>
      </header>

      <section className={styles.blogIntro}>
        <p>
          The Sababu Fund is more than just an organization; it is a lifeline
          for families facing some of the most challenging moments of their
          lives. In this blog post, we aim to highlight the vital importance of
          the Sababu Fund and what it means to our members.
        </p>
      </section>

      <section className={styles.alternateSection}>
        <div className={styles.textBlock}>
          <p>
            At its core, the Sababu Fund exists to provide essential support to
            families during times of grief and loss. The death of a loved one is
            an incredibly difficult experience, and the logistical and financial
            burdens can add to the emotional strain. This is where the Sababu
            Fund steps in, offering a comprehensive support system to ease these
            burdens.
          </p>
        </div>
        <img
          src="/images/sb-2023-agm-members-2.jpg"
          alt="Family support"
          className={styles.altImage}
        />
      </section>

      <section className={styles.alternateSectionReverse}>
        <img
          src="/images/nw_image_5.jpg"
          alt="Support system"
          className={styles.altImage}
        />
        <div className={styles.textBlock}>
          <p>
            Our services include financial assistance for funeral proceedings,
            repatriation, and transportation, ensuring that families can focus
            on mourning and healing without the added stress of logistical
            challenges. Additionally, we provide grief packages and access to
            counseling services, offering both practical and emotional support
            to help families navigate their grief.
          </p>
        </div>
      </section>

      <section className={styles.alternateSection}>
        <div className={styles.textBlock}>
          <p>
            For our members, the Sababu Fund represents a community of
            compassion and solidarity. It is a testament to the strength of our
            bonds and our commitment to standing by each other in times of need.
            By contributing to the Sababu Fund, members are not only supporting
            others but also ensuring that they and their families will have
            access to critical support when they need it most.
          </p>
        </div>
        <img
          src="/images/nw_image_3.jpg"
          alt="Community"
          className={styles.altImage}
        />
      </section>

      <section className={styles.highlightSection}>
        <h2>Why the Sababu Fund Matters</h2>
        <div className={styles.highlightGrid}>
          <div className={styles.highlightItem}>
            <i
              className={`${"fa-solid fa-coins"} ${styles.highlightImage}`}
            ></i>
            <div className={styles.highlightText}>
              <strong>Financial Security:</strong> By pooling resources, the
              Sababu Fund ensures that families receive some financial support
              they needed during times of loss, alleviating the burden of
              funeral expenses and other related costs.
            </div>
          </div>
          <div className={styles.highlightItem}>
            <i
              className={`${"fa-solid fa-clover"} ${styles.highlightImage}`}
            ></i>
            <div className={styles.highlightText}>
              <strong>Emotional Support:</strong> Access to grief counseling and
              support groups helps families cope with their loss, providing a
              safe space to express their emotions and begin the healing
              process.
            </div>
          </div>
          <div className={styles.highlightItem}>
            <i
              className={`${"fa-solid fa-shield-heart"} ${
                styles.highlightImage
              }`}
            ></i>

            <div className={styles.highlightText}>
              <strong>Community Solidarity:</strong> The Sababu Fund fosters a
              strong sense of community, where members support one another,
              strengthening the bonds that hold us together and ensuring that no
              one faces their challenges alone.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.actionSection}>
        <h2>Join Us in Making a Difference</h2>
        <div className={styles.actionGrid}>
          <div className={styles.actionItem}>
            <h3>Become a Member</h3>
            <p>
              If you are not yet a member, we invite you to join our growing
              community. Your membership not only provides you with access to
              our support services but also strengthens our collective ability
              to assist others.
            </p>
          </div>
          <div className={styles.actionItem}>
            <h3>Volunteer</h3>
            <p>
              Offer your time and skills to help us prepare and deliver grief
              packages, assist with funeral proceedings, or provide counseling
              support.
            </p>
          </div>
          <div className={styles.actionItem}>
            <h3>Donate</h3>
            <p>
              Your financial contributions enable us to continue offering these
              critical services to families in need. Consider making a donation
              to the Sababu Fund.
            </p>
          </div>
          <div className={styles.actionItem}>
            <h3>Spread the Word</h3>
            <p>
              Share information about our initiatives with your network. The
              more people who know about our work, the more support we can
              gather for grieving families.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.footerSection}>
        <h2>On the Horizon</h2>
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

export default ForYouBlog;
