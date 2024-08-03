import { Outlet, Link } from "react-router-dom";
import AppNav from "../components/AppNav";
import Button from "../components/Button";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import styles from "./Services.module.css";
import { HashLink } from "react-router-hash-link";

function Services() {
  return (
    <>
      <main>
        <AppNav />
        <Support />
        <Programs />
        <GetInvolve />
        <NewsLetter />
        <Footer />
      </main>
      <Outlet />
    </>
  );
}

function Support() {
  return (
    <section className={styles.supportContainer}>
      <div className={styles.support}>
        <div className={styles.supportText}>
          <h1 className="headingPrimary">Let&apos;s Make a Difference</h1>
          <p>
            Sababu&apos;s initiatives are at the heart of constructing a
            compassionate and empathetic network that serves as a pillar of
            support for individuals navigating the challenging journey of grief.
            By fostering a community-driven approach, Sababu strives to create
            an environment where individuals facing loss find solace,
            understanding, and companionship.
          </p>
        </div>

        <div className={styles.serviceImg}>
          <div className={`${"section"} ${styles.imgContent}`}>
            <div className={`${styles.serviceImgInner}`}>
              <div className={`${styles.serviceImgContent}`}>
                <div className={styles.imgContent}>
                  <h2>Sharing love beyond borders.</h2>
                  <p>Can we count on your support?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className={`section sectionLayout ${styles.programs}`}>
      <p className="intro">Our programs</p>
      <h1 className="headingPrimary">Our Programs</h1>
      <div className={`grid gridThreeCol ${styles.programType}`}>
        <div>
          <h2 className="headingSecondary">Grief Support</h2>
          <p>
            Sababu offers grief support to members that includes alleviating
            funeral costs, counseling, and therapy services to guide individuals
            through the challenging journey of grief, fostering emotional
            healing and well-being. Sababu also manages the intricate logistics
            involved in repatriation of the member, ensuring a seamless and
            respectful process from the place of passing to Sierra Leone.
          </p>
          <HashLink smooth to="grief-support#top" className="ctaLink">
            Learn more
          </HashLink>
        </div>
        <div>
          <h2 className="headingSecondary">Outreach</h2>
          <p>
            Sababu actively engages in community outreach initiatives to foster
            unity and solidarity among community members. Together we build a
            compassionate community network, to unite and provide a supportive
            environment where members can share experiences, find understanding,
            and connect with others who are navigating the complexities of
            grief.
          </p>
          <HashLink smooth to="outreach#top" className="ctaLink">
            Learn more
          </HashLink>
        </div>
        <div>
          <h2 className="headingSecondary">Events</h2>
          <p>
            Sababu organizes and promotes a variety of social events to
            strengthen community ties and celebrate the diversity and spirit of
            the community. Through community social events, Sababu contributes
            to the overall well-being of the community, fostering a supportive
            environment where individuals can form meaningful connections and
            find comfort in shared experiences.
          </p>
          <div></div>
        </div>
      </div>
    </section>
  );
}

function GetInvolve() {
  return (
    <div className={styles.getInvolvedContainer}>
      <section className={`${"section"} ${styles.getInvolvedSection}`}>
        <p className="intro">Who we are</p>
        <div className={styles.getInvolved}>
          <h1 className="headingPrimary">Get Involved </h1>
          <p>
            We&apos;re always looking for ways to expand our reach and impact,
            and we&apos;re committed to making a difference in the lives of
            those in our community and beyond. If you&apos;re interested in
            getting involved, we&apos;d love to hear from you!
          </p>
          {/* <div>
            <HashLink smooth to="/home/donate#top">
              <Button type="primary">Donate</Button>
            </HashLink>
            <HashLink smooth to="/home/volunteer#top">
              <Button type="secondary">Volunteer</Button>
            </HashLink>
          </div> */}
          <div>
            <HashLink smooth to="/contacts#top">
              <Button type="primary">Donate</Button>
            </HashLink>
            <HashLink smooth to="/contacts#top">
              <Button type="secondary">Volunteer</Button>
            </HashLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
