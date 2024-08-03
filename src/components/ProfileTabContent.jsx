import React from "react";
import styles from "./ProfileTabContent.module.css";
import Profile from "../pages/Profile";
import Members from "../pages/Members";
import Wallet from "../pages/Wallet";
import Events from "../pages/Events";
import Resources from "../pages/Resources";

const ProfileTabContent = ({ activeTab, events }) => {
  console.log(events);
  return (
    <div className={styles.tabContent}>
      {activeTab === "profile" && (
        <div>
          <Profile />
        </div>
      )}
      {activeTab === "members" && (
        <div>
          <Members />
        </div>
      )}
      {activeTab === "wallet" && (
        <div>
          <Wallet />
        </div>
      )}
      {activeTab === "events" && (
        <div>
          <Events events={events} />
        </div>
      )}
      {activeTab === "resources" && (
        <div>
          <Resources />
        </div>
      )}
      {activeTab === "help" && <div>Help Content</div>}
      {activeTab === "logout" && <div>Logout Content</div>}
    </div>
  );
};

export default ProfileTabContent;
