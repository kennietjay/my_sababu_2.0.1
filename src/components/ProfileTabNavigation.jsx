import React from "react";
import styles from "./ProfileTabNavigation.module.css";

const ProfileTabNavigation = ({ activeTab, onTabClick }) => {
  return (
    <nav className={styles.tabNavigation}>
      <ul>
        <li
          className={activeTab === "profile" ? styles.active : ""}
          onClick={() => onTabClick("profile")}
        >
          <i className="fa-solid fa-house"></i>
          <span className={styles.navItem}>Home</span>
        </li>
        <li
          className={activeTab === "members" ? styles.active : ""}
          onClick={() => onTabClick("members")}
        >
          <i className="fa-solid fa-users"></i>
          <span className={styles.navItem}>Members</span>
        </li>
        <li
          className={activeTab === "wallet" ? styles.active : ""}
          onClick={() => onTabClick("wallet")}
        >
          <i className="fa-solid fa-wallet"></i>
          <span className={styles.navItem}>Wallet</span>
        </li>
        <li
          className={activeTab === "events" ? styles.active : ""}
          onClick={() => onTabClick("events")}
        >
          <i className="fa-solid fa-calendar-days"></i>
          <span className={styles.navItem}>Events</span>
        </li>
        <li
          className={activeTab === "resources" ? styles.active : ""}
          onClick={() => onTabClick("resources")}
        >
          <i className="fa-solid fa-list-check"></i>
          <span className={styles.navItem}>Resources</span>
        </li>
        <li
          className={activeTab === "help" ? styles.active : ""}
          onClick={() => onTabClick("help")}
        >
          <i className="fa-solid fa-circle-question"></i>
          <span className={styles.navItem}>Help</span>
        </li>
        <li className={styles.logout} onClick={() => onTabClick("logout")}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className={styles.navItem}>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileTabNavigation;
