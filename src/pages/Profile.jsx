import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import img from "/images/sb-director.jpeg";
import DynamicTable from "../components/DynamicTable";
import DataForm from "../components/DataForm";
import DataModal from "../components/DataModal";
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const imgFile = img ? img : "/path/to/profile-image.jpg";
  const [spouse, setSpouse] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  // Profile edit form
  const [profileFormData, setProfileFormData] = useState({});
  // const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentData, setCurrentData] = useState(null);

  //
  useEffect(() => {
    const userData = [
      {
        first_name: "James",
        last_name: "Doe",
        sex: "Male",
        middle_name: "",
        member_id: "SB10001",
        email: "john@example.com",
        phone: "557-334-2343",
        street: "13796 Merrybrook Court, 302",
        city: "New York",
        state: "NY",
        zip: "20171",
        member_type: "Family",
        member_since: "Sep, 2024",
        dependents: [],
        spouse: null,
        emergencyContact: null,
      },
    ];

    const data = [
      {
        type: "spouse",
        first_name: "Jane",
        last_name: "Johnson",
        sex: "F",
        relationship: "Wife",
        age: 40,
        dob: "1983-05-12",
        occupation: "Engineer",
        address: {
          street: "123 Maple Street",
          city: "Springfield",
          state: "IL",
          zip: "62704",
        },
        phone: "123-456-7890",
        email: "example@gmail.com",
        // liveTogether: true,
      },
      {
        type: "dependent",
        first_name: "Alice",
        last_name: "Johnson",
        sex: "F",
        relationship: "Daughter",
        age: 10,
        dob: "2014-06-15",
        school: "Greenwood Elementary School",
        address: {
          street: "123 Maple Street",
          city: "Springfield",
          state: "IL",
          zip: "62704",
        },
        phone: "123-456-7890",
        email: "example@gmail.com",
        // liveTogether: true,
      },
      {
        type: "dependent",
        first_name: "Bobby",
        last_name: "Johnson",
        sex: "M",
        relationship: "Son",
        age: 7,
        dob: "2016-09-22",
        school: "Greenwood Elementary School",
        address: {
          street: "123 Maple Street",
          city: "Springfield",
          state: "IL",
          zip: "62704",
        },
        phone: "987-654-3210",
        email: "example@gmail.com",
        // liveTogether: true,
      },
      {
        type: "emergency",
        first_name: "Catherine",
        last_name: "Johnson",
        sex: "F",
        relationship: "Mother",
        age: 65,
        dob: "1959-11-03",
        occupation: "Retired",
        address: {
          street: "123 Maple Street",
          city: "Springfield",
          state: "IL",
          zip: "62704",
        },
        phone: "555-555-5555",
        email: "example@gmail.com",
        // liveTogether: false,
      },
    ];

    const formattedUser = userData.map(
      ({
        first_name,
        last_name,
        member_id,
        member_type,
        member_since,
        sex,
        street,
        phone,
        email,
        city,
        state,
        zip,
      }) => ({
        first_name,
        last_name,
        member_id,
        member_type,
        member_since,
        sex,
        street,
        phone,
        email,
        city,
        state,
        zip,
      })
    );

    const formattedSpouse = data
      .filter((item) => item.type === "spouse")
      .map(
        ({ first_name, last_name, sex, dob, relationship, email, phone }) => ({
          first_name,
          last_name,
          sex,
          dob,
          relation: relationship,
          email,
          phone,
        })
      );

    const formattedDependents = data
      .filter((item) => item.type === "dependent")
      .map(({ first_name, last_name, sex, age, relationship }) => ({
        first_name,
        last_name,
        sex,
        age,
        relation: relationship,
      }));

    const formattedEmergencyContacts = data
      .filter((item) => item.type === "emergency")
      .map(({ first_name, last_name, sex, relationship, phone, email }) => ({
        first_name,
        last_name,
        sex,
        relation: relationship,
        phone,
        email,
      }));

    setUser(formattedUser);
    setProfileFormData(formattedUser);
    setSpouse(formattedSpouse);
    setDependents(formattedDependents);
    setEmergencyContacts(formattedEmergencyContacts);
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setProfileFormData((prevState) => {
      const newFormData = [...prevState];
      newFormData[index][name] = value;
      return newFormData;
    });
  };

  const handleOpenDataModal = (type, data = {}) => {
    setModalType(type);
    setCurrentData(data);
    setIsModalOpen(true);
    console.log("Data saved:", data);
  };

  const handleCloseDataModal = () => {
    setIsModalOpen(false);
    setCurrentData(null);

    console.log("Form closed");
  };

  const handleSaveData = (data) => {
    switch (modalType) {
      case "spouse":
        setSpouse((prevData) =>
          data.id
            ? prevData.map((item) => (item.id === data.id ? data : item))
            : [...prevData, data]
        );
        break;
      case "dependent":
        setDependents((prevData) =>
          data.id
            ? prevData.map((item) => (item.id === data.id ? data : item))
            : [...prevData, data]
        );
        break;
      case "emergencyContact":
        setEmergencyContacts((prevData) =>
          data.id
            ? prevData.map((item) => (item.id === data.id ? data : item))
            : [...prevData, data]
        );
        break;
      case "profile":
        setUser((prevData) =>
          data.id
            ? prevData.map((item) => (item.id === data.id ? data : item))
            : [...prevData, data]
        );
        break;
      default:
        break;
    }
    handleCloseDataModal();
  };

  const isUserProfileEdit = true; // or false, based on your logic

  //
  return (
    <div className={styles.myProfile}>
      <div className={` ${styles.profileContainer}`}>
        <div className={styles.wrapper}>
          <section className={styles.main}>
            <ProfileMain
              user={user}
              imgFile={imgFile}
              handleChange={handleChange}
              profileFormData={profileFormData}
              currentData={currentData}
              isModalOpen={isModalOpen}
              handleClose={handleCloseDataModal}
              handleOpen={handleOpenDataModal}
              setProfileFormData={setProfileFormData}
              isUserProfileEdit={isUserProfileEdit}
            />

            <Spouse
              spouse={spouse}
              handleOpen={handleOpenDataModal}
              handleClose={handleCloseDataModal}
              setSpouse={setSpouse}
            />
            <Dependents
              dependents={dependents}
              handleOpen={handleOpenDataModal}
              handleClose={handleCloseDataModal}
              setDependents={setDependents}
            />
            <EmergencyContact
              emergencyContacts={emergencyContacts}
              handleOpen={handleOpenDataModal}
              handleClose={handleCloseDataModal}
              setEmergencyContacts={setEmergencyContacts}
            />

            <DataModal isOpen={isModalOpen} onClose={handleCloseDataModal}>
              <DataForm
                user={user}
                initialData={currentData}
                onSave={handleSaveData}
                onClose={handleCloseDataModal}
                type={modalType}
                isUserProfileEdit={isUserProfileEdit}
              />
            </DataModal>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Profile;

function ProfileMain({
  user,
  imgFile,
  handleChange,
  profileFormData,
  isModalOpen,
  handleClose,
  handleOpen,
  isUserProfileEdit, // or false, based on your logic
}) {
  const handleEdit = (user) => {
    handleOpen("profile", user); // Open the modal
  };

  return (
    <section className={styles.mainProfile}>
      <h3>My Profile</h3>
      <div className={styles.profileBox}>
        {user?.map((user) => (
          <div className={styles.details} key={user.member_id}>
            <div className={styles.personalInfo}>
              <div className={styles.profileName}>
                <div className={styles.profileImageContainer}>
                  <img
                    src={imgFile}
                    alt="Profile image"
                    className={styles.profileImage}
                  ></img>
                  <div className={styles.imageIcon}>
                    <i className="fa-solid fa-camera"></i>
                  </div>
                </div>

                <ul>
                  <li>
                    <span>ID:</span>
                    <span>{user.member_id}</span>
                  </li>
                  <li>
                    <span>Name:</span>
                    <span>
                      {user.first_name} {user.last_name}
                    </span>
                  </li>
                  <li>
                    <span>Type:</span> <span>{user.sex}</span>
                  </li>
                  <li>
                    <span>Type:</span> <span>{user.member_type}</span>
                  </li>
                  <li>
                    <span>Joined:</span> <span>{user.member_since}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.socialIcons}>
                <NavLink to="">
                  <i className="fa-brands fa-facebook"></i>
                </NavLink>
                <NavLink
                  to="https://chat.whatsapp.com/D8G3RSysdxBEyDVbYO30ML"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </NavLink>
              </div>
            </div>
            <div className={styles.box}>
              <h3>Contacts</h3>
              <ul>
                <li>
                  <span>Address:</span> <span>{user.street}</span>
                </li>
                <li>
                  <span>City:</span> <span>{user.city}</span>
                </li>
                <li>
                  <span>State:</span> <span>{user.state}</span>
                </li>
                <li>
                  <span>Zip:</span> <span>{user.zip}</span>
                </li>
                <li>
                  <span>Email:</span> <span>{user.email}</span>
                </li>
                <li>
                  <span>Phone:</span> <span>{user.phone}</span>
                </li>
              </ul>

              <p className={styles.lastUpdated}>
                Last profile update: September 10th, 2024.
              </p>
              <button onClick={() => handleEdit(user)}>Edit Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Spouse({ spouse, handleOpen, setSpouse }) {
  const handleEdit = (spouseData) => {
    handleOpen("spouse", spouseData);
  };

  // Function to handle deleting a spouse entry
  const handleDelete = (id) => {
    // Filter out the spouse entry with the provided id
    setSpouse(spouse.filter((item) => item.id !== id));
  };

  return (
    <section className={styles.mainProfile}>
      <h3>Spouse</h3>
      <div className={styles.profileContent}>
        <div className={styles.contentDetails}>
          <h3>My Spouse Table</h3>
          <div>
            <DynamicTable
              data={spouse}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <div className={styles.profileActions}>
            <button onClick={() => handleOpen("spouse")}>
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dependents({ dependents, handleOpen, setDependents }) {
  const handleEdit = (dependentData) => {
    handleOpen("spouse", dependentData);
  };

  // Function to handle deleting a spouse entry
  const handleDelete = (id) => {
    // Filter out the spouse entry with the provided id
    setDependents(dependents.filter((item) => item.id !== id));
  };

  return (
    <section className={styles.mainProfile}>
      <h3>Household</h3>
      <div className={styles.profileContent}>
        <div className={styles.contentDetails}>
          <h3>Dependents</h3>
          <DynamicTable
            data={dependents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <div className={styles.profileActions}>
            <button onClick={() => handleOpen("dependent")}>
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmergencyContact({
  emergencyContacts,
  handleOpen,
  setEmergencyContacts,
}) {
  const handleEdit = (emergencyData) => {
    handleOpen("emergencyContact", emergencyData);
  };

  // Function to handle deleting a spouse entry
  const handleDelete = (id) => {
    // Filter out the spouse entry with the provided id
    setEmergencyContacts(emergencyContacts.filter((item) => item.id !== id));
  };

  return (
    <section className={styles.mainProfile}>
      <h3>Emergency Contact</h3>
      <div className={styles.profileContent}>
        <div className={styles.contentDetails}>
          <h3>My Emergency Contact</h3>
          <DynamicTable
            data={emergencyContacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <div className={styles.profileActions}>
            <button onClick={() => handleOpen("emergencyContact")}>
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
