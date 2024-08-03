import React from "react";
import styles from "./Resources.module.css";
import { NavLink } from "react-router-dom";

function Resources(props) {
  return (
    <div className={styles.resourceContainer}>
      <h1>Resources</h1>
      <section className={styles.memberResources}>
        <div className={styles.membershipCard}>
          <h3>Events</h3>
          <button className={styles.resourceBtn}>Report an event</button>
        </div>
        <div className={styles.membershipCard}>
          <h3>Membership Cards</h3>
          <button className={styles.resourceBtn}>
            Get your membership card
          </button>
        </div>

        <div className={styles.membershipCard}>
          <h3>Membership Cards</h3>
          <button className={styles.resourceBtn}>Membership Cards</button>
        </div>
      </section>
    </div>
  );
}

export default Resources;
