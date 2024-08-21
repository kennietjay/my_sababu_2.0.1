import React from "react";
import styles from "./WelcomeNewsletter.module.css"; // Import the CSS module

const WelcomeNewsletter = () => {
  return (
    <div className={styles.newsletterContainer}>
      <header className={styles.newsletterHeader}>
        <h1>Sababu Fund Newsletter</h1>
        <h2>Supporting Our Community with Empathy and Resources.</h2>
      </header>

      <section className={styles.newsletterIntro}>
        <p>Dear Members, Friends and Supporters,</p>
        <p>
          As we journey together through life, we are reminded of the incredible
          strength and resilience that define our communities. The Sababu Fund
          remains dedicated to supporting individuals and families during
          challenging times, offering compassion and essential resources.
          Together, we foster a sense of togetherness and resilience that is
          truly inspiring.
        </p>

        <p>
          Despite the challenges life presents, there is always an inherent
          sense of belonging to a community and making a significant impact in
          someone's life. This is where the Sababu Fund organization comes into
          play. We are excited to share some of the remarkable achievements we
          have made since our inception.
        </p>
      </section>

      <section className={styles.newsletterSection}>
        <h2>Celebrating Our Achievements</h2>
        <ul>
          <li className={styles.sectionItem}>
            <img
              src="/images/nw_image_5.jpg"
              alt="Membership drive success"
              className={styles.sectionImage}
            />
            <div>
              <strong>Membership Drive Success:</strong> Our membership drive
              has been a tremendous success, welcoming over 106 new members and
              their families into the Sababu Fund family. Each new member brings
              us closer to our goal of providing comprehensive support to all
              Sierra Leoneans in the United States during their times of need.
            </div>
          </li>
          <li className={styles.sectionItem}>
            <img
              src="/images/nw_image_3.jpg"
              alt="Fundraising triumph"
              className={styles.sectionImage}
            />
            <div>
              <strong>Fundraising Triumph:</strong> Through our collective
              efforts, we have raised over $5,000 in registration and renewal
              funds. These contributions are vital in enabling us to continue
              our mission of providing grief packages and facilitating funeral
              proceedings for Sierra Leoneans who pass away in the United
              States.
            </div>
          </li>
          <li className={styles.sectionItem}>
            <img
              src="/images/nw_image_4.jpg"
              alt="General meetings"
              className={styles.sectionImage}
            />
            <div>
              <strong>General Meetings:</strong> We meeting twice a year at
              genenral membership level, and we have held two insightful and
              productive general meetings in since our inception. These meetings
              have been instrumental in shaping our strategies and ensuring that
              we are aligned with our mission. We are excited to announce that
              our next general meeting is scheduled for November 17th, 2024, at
              5 PM. We encourage all members and supporters to join us as we
              discuss our progress and plan for the future.
            </div>
          </li>
        </ul>
      </section>

      <section className={styles.newsletterSection}>
        <h2>Join Us in Making a Difference</h2>
        <p>
          Our work is far from over, and we need your continued support to
          expand our reach and impact. Here are a few ways you can get involved
          and help spread the word about the Sababu Fund:
        </p>
        <ul>
          <li>
            <strong>Become a Member:</strong>{" "}
            <p>
              If you are not yet a member, we invite you to join our growing
              community. Your membership not only provides you with access to
              our support services but also strengthens our collective ability
              to assist others.
            </p>
          </li>
          <li>
            <strong>Spread the Word:</strong>{" "}
            <p>
              Share information about the Sababu Fund with your friends, family,
              and social networks. By raising awareness, we can reach more
              individuals who might benefit from our services or want to support
              our mission.
            </p>
          </li>
          <li>
            <strong>Volunteer Your Time:</strong>{" "}
            <p>
              We are always in need of dedicated volunteers to help with various
              aspects of our work. Whether you can offer your skills, time, or
              expertise, your contributions are invaluable to us.
            </p>
          </li>
          <li>
            <strong>Donate:</strong>{" "}
            <p>
              Consider making a donation to the Sababu Fund. Your financial
              support directly impacts our ability to provide critical services
              to those in need.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.newsletterSection}>
        <h2>Looking Ahead</h2>
        <p>
          As we prepare for our next general meeting on November 17th, 2024, we
          are filled with optimism and excitement for the future. Together, we
          can continue to build a supportive and compassionate community that
          stands by each other during life’s most challenging moments.
        </p>
        <p>
          Thank you for your support and dedication. Your involvement makes all
          the difference. Let’s continue to uplift and empower each other,
          fostering a sense of togetherness and resilience that will carry us
          forward.
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

export default WelcomeNewsletter;
