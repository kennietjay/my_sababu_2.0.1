import React, { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { NavLink } from "react-router-dom";
import DynamicTable from "../components/DynamicTable";
import ProfileTabNavigation from "../components/ProfileTabNavigation";
import ProfileTabContent from "../components/ProfileTabContent";
import AppNav from "../components/AppNav";
import { useEvents } from "../contexts/EventContext";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <AppNav />
      <div className={styles.container}>
        <div className={`${styles.profilePage}`}>
          <div className={styles.navContainer}>
            <ProfileTabNavigation
              activeTab={activeTab}
              onTabClick={handleTabClick}
            />
          </div>
          <div className={styles.navContent}>
            <ProfileTabContent activeTab={activeTab} events={events} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

// function ProfileNav() {
//   return (
//     <nav className={styles.profileNav}>
//       <ul>
//         <li>
//           <NavLink to="/my_sababu">
//             <i className="fa-solid fa-house"></i>
//             <span className={styles.navItem}>Home</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="profile">
//             <i className="fa-solid fa-users"></i>
//             <span className={styles.navItem}>Members</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="contributions">
//             <i className="fa-solid fa-wallet"></i>
//             <span className={styles.navItem}>Wallet</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink>
//             <i className="fa-solid fa-calendar-days"></i>
//             <span className={styles.navItem}>Events</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink>
//             <i className="fa-solid fa-list-check"></i>
//             <span className={styles.navItem}>Tasks</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink>
//             <i className="fa-solid fa-circle-question"></i>
//             <span className={styles.navItem}>Help</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink className={styles.logout}>
//             <i className="fa-solid fa-right-from-bracket"></i>
//             <span className={styles.navItem}>Logout</span>
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// function Spouse({ spouse, handleOpen, setSpouse }) {
//   const handleEdit = (spouseData) => {
//     handleOpen("spouse", spouseData);
//   };

//   // Function to handle deleting a spouse entry
//   const handleDelete = (id) => {
//     // Filter out the spouse entry with the provided id
//     setSpouse(spouse.filter((item) => item.id !== id));
//   };

//   return (
//     <section className={styles.mainProfile}>
//       <h3>My Spouse</h3>
//       <div className={styles.profileContent}>
//         <div className={styles.contentDetails}>
//           <h3>My Spouse Table</h3>
//           <div>
//             <DynamicTable
//               data={spouse}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           </div>
//           <div className={styles.profileActions}>
//             <button onClick={() => handleOpen("spouse")}>
//               <i className="fa-solid fa-user-plus"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Dependents({ dependents, handleOpen, setDependents }) {
//   const handleEdit = (dependentData) => {
//     handleOpen("spouse", dependentData);
//   };

//   // Function to handle deleting a spouse entry
//   const handleDelete = (id) => {
//     // Filter out the spouse entry with the provided id
//     setDependents(dependents.filter((item) => item.id !== id));
//   };
//   return (
//     <section className={styles.mainProfile}>
//       <h2>My Household</h2>
//       <div className={styles.profileContent}>
//         <div className={styles.contentDetails}>
//           <h3>Dependents</h3>
//           <DynamicTable
//             data={dependents}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//           <div className={styles.profileActions}>
//             <button onClick={() => handleOpen("dependent")}>
//               <i className="fa-solid fa-user-plus"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function EmergencyContact({
//   emergencyContacts,
//   handleOpen,
//   setEmergencyContacts,
// }) {
//   const handleEdit = (emergencyData) => {
//     handleOpen("emergencyContact", emergencyData);
//   };

//   // Function to handle deleting a spouse entry
//   const handleDelete = (id) => {
//     // Filter out the spouse entry with the provided id
//     setEmergencyContacts(emergencyContacts.filter((item) => item.id !== id));
//   };
//   return (
//     <section className={styles.mainProfile}>
//       <h2>Emergency Contact</h2>
//       <div className={styles.profileContent}>
//         <div className={styles.contentDetails}>
//           <h3>My Emergency Contact</h3>
//           <DynamicTable
//             data={emergencyContacts}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//           <div className={styles.profileActions}>
//             <button onClick={() => handleOpen("emergencyContact")}>
//               <i className="fa-solid fa-user-plus"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
