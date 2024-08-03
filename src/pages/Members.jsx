import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import styles from "./Members.module.css";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal"; // Adjust the path as necessary

function Members() {
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const pageNumberLimit = 5;
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal) return null;
    return (
      <Modal className={styles.modal}>
        <h2 className={styles.modalHeader}>Register Customer</h2>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </Modal>
    );
  };

  return (
    <section>
      <div className={styles.membersContainer}>
        <div className={styles.profileHeader}>
          <h3 className="headingTertiary">Members</h3>
        </div>
        {members.length > 0 ? (
          <div className={styles.household}>
            <Pagination
              items={members}
              itemsPerPage={itemsPerPage}
              pageNumberLimit={pageNumberLimit}
              renderFunction={RenderList}
            />
          </div>
        ) : (
          <p>No members to display. Add the first one</p>
        )}
        {renderModal()}
      </div>
    </section>
  );
}

function RenderList(members) {
  const sortedList = members?.sort((a, b) => b.id - a.id);
  return (
    <ul className={styles.allMembers}>
      {sortedList?.map((item, index) => (
        <Member key={index} member={item} />
      ))}
    </ul>
  );
}

function Member({ member }) {
  const { id, address, member_type, first_name, middle_name, last_name } =
    member;

  return (
    <li>
      <Link key={id} className={styles.memberList} to={`${id}`}>
        <div className={styles.member}>
          <div className={styles.memberAavatar}>
            <Avatar
              fgColor={
                member_type === "family"
                  ? "#ac255e"
                  : member_type === "single"
                  ? "#2faa75"
                  : member_type === "retired"
                  ? "#b8860b"
                  : "#008bf8"
              }
              color={
                member_type === "family"
                  ? "#eed3df"
                  : member_type === "single"
                  ? "#d5eee3"
                  : member_type === "retired"
                  ? "#f1e7ce"
                  : "#cce8fe"
              }
              size={50}
              round="5rem"
              name={`${first_name} ${
                middle_name ? middle_name : ""
              } ${last_name}`}
            />
          </div>
          <div className={styles.memberCard}>
            <div className={styles.memberId}>
              ID: <strong>{id}</strong>
            </div>
            <h4 className={styles.memberName}>
              {`${first_name} ${middle_name ? middle_name : ""} ${last_name}`}
            </h4>
            <div className={styles.addressContent}>
              <span>{address.city ? address.city : ""}, </span>
              <span>{address.state ? address.state : ""}.</span>
            </div>
          </div>
          <div className={styles.memberType}>
            {member_type === "single" ? (
              <span className={styles.single}>Single</span>
            ) : member_type === "retired" ? (
              <span className={styles.retired}>Senior Citizen</span>
            ) : member_type === "family" ? (
              <span className={styles.family}>Family</span>
            ) : (
              <span className={styles.singleFamily}>Single Family</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Members;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Avatar from "react-avatar";

// import styles from "./Members.module.css";
// import Pagination from "../components/Pagination";
// import Button from "../components/Button";

// function Members() {
//   const [showModal, setShowModal] = useState(false);
//   const itemsPerPage = 6;
//   const pageNumberLimit = 5;

//   const navigate = useNavigate();

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const renderModal = () => {
//     if (!showModal) return null;
//     // Render your modal component with specific form fields for the selected member_type
//     return (
//       <Modal className={styles.modal}>
//         <h2 className={styles.modalHeader}>Register Customer</h2>
//         <button onClick={closeModal} className={styles.modalCloseBtn}>
//           <i className="fa-solid fa-xmark"></i>
//         </button>
//       </Modal>
//     );
//   };

//   return (
//     <div className={styles.membersContainer}>
//       <div className={styles.profileHeader}>
//         <h3 className={`${"headingTertiary"}`}>Members</h3>
//         <Button type="back" onClick={() => navigate(-1)}>
//           <i className="fa-solid fa-chevron-left"></i>
//         </Button>
//       </div>
//       <div className={styles.memberPageHeader}>
//         <div className={styles.btnConntainer}>
//           <button onClick={() => openModal()}>Add</button>
//         </div>
//       </div>
//       {members.length > 0 ? (
//         <div className={styles.household}>
//           <Pagination
//             items={members}
//             itemsPerPage={itemsPerPage}
//             pageNumberLimit={pageNumberLimit}
//             renderFunction={RenderList}
//           />
//         </div>
//       ) : (
//         <p>No members to display. Add the first one</p>
//       )}
//       {renderModal()}
//     </div>
//   );
// }

// function RenderList(members) {
//   const sortedList = members?.sort((a, b) => b.id - a.id);
//   return (
//     <>
//       <ul className={styles.allMembers}>
//         {sortedList?.map((item, index) => (
//           <Member key={index} member={item} />
//         ))}
//       </ul>
//     </>
//   );
// }

// export default Members;

// function Member({ member }) {
//   const { id } = member;

//   let city, state; // Declare email variable outside the if block

//   return (
//     <li>
//       <Link key={member.id} className={styles.memberList} to={`${id}`}>
//         <div className={styles.members}>
//           <div className={styles.memberAavatar}>
//             <Avatar
//               fgColor={
//                 member.member_type === 1
//                   ? "#612b75"
//                   : member.member_type === 2
//                   ? "#6e89a3"
//                   : member.member_type === 4
//                   ? "#b8860b"
//                   : "#009fc7"
//               }
//               color={
//                 member.member_type === 1
//                   ? "#d3c1da"
//                   : member.member_type === 2
//                   ? "#e2e7ed"
//                   : member.member_type === 4
//                   ? "#feeeb3"
//                   : "#ccecf4"
//               }
//               size={60}
//               round="5rem"
//               name={`${member.first_name} ${
//                 member.middle_name ? member.middle_name : ""
//               } ${member.last_name}}`}
//             />
//           </div>
//           <div className={styles.memberCard}>
//             <div className={styles.memberId}>
//               Membership ID: <strong>{member.id}</strong>
//             </div>
//             <h3 className={styles.member}>
//               {`${member.first_name} ${
//                 member.middle_name ? member.middle_name : ""
//               } ${member.last_name}`}
//             </h3>
//             <div>
//               <div>
//                 <span>{city ? city : ""}, </span>
//                 <span>{state ? state : ""}.</span>
//               </div>
//             </div>
//             <div className={styles.memberDetails}>
//               {member.member_type === 1 ? (
//                 <span className={styles.single}>
//                   {member.member_type === 1 ? "Single" : ""}
//                 </span>
//               ) : member.member_type === 4 ? (
//                 <span className={styles.retired}>
//                   {member.member_type === 4 ? "Senior Citizen" : ""}
//                 </span>
//               ) : member.member_type === 2 ? (
//                 <span className={styles.family}>
//                   {member.member_type === 2 ? "Family" : ""}
//                 </span>
//               ) : (
//                 <span className={styles.singleFamily}>
//                   {member.member_type === 3 ? "Single Family" : ""}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </Link>
//     </li>
//   );
// }

// // Modal.js
// const Modal = ({ children, onClose }) => {
//   return (
//     <div className={styles.modalOverlay} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   );
// };

const members = [
  {
    first_name: "Amara",
    middle_name: "T",
    last_name: "Jaward",
    sex: "M",
    dob: "12/3/1972",
    marital_status: "Married",
    member_type: "family",
    hometown: "Herndon",
    nationality: "American",
    phone: "5714716384",
    email: "4jayamara@gmail.com",
    address: {
      street: "2401 Little Current Drive",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        spouseFirstName: "Aminata",
        spouseLastName: "Jaward",
        address: {
          spouseStreet: "13796 Merrybrook CT",
          spouseApt: "302",
          spouseCity: "Herndon",
          spouseState: "VA",
          spouseZip: "20171",
        },
        spouseDob: "12388",
        spouseSex: "F",
        spouseNationality: "American",
      },
      dependents: [
        {
          dependentName: "Molai Turay",
          dependentSex: "male",
          dependentDob: "8/18/2007",
          dependentRelation: "son",
          liveTogether: "Yes",
        },
        {
          dependentName: "Faith Smith",
          dependentSex: "female",
          dependentDob: "8/18/2017",
          dependentRelation: "daughter",
          liveTogether: "Yes",
        },
        {
          dependentSex: "M",
          dependentDob: "12/5/1980",
          dependentRelation: "Grandson",
          liveTogether: "Yes",
          dependentName: "Mohamed Kamara",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alpha M Bah",
      emrPhone: "4713421824",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "uncle",
      emrSex: "male",
    },
    id: 1,
  },
  {
    first_name: "Amidu",
    middle_name: "Manso",
    last_name: "Kargbo",
    sex: "M",
    dob: "10/12/1964",
    marital_status: "Single",
    member_type: "singleFamily",
    hometown: "Herndon",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
      },
      dependents: [
        {
          dependentName: "Mariatu Kagbo",
          dependentSex: "F",
          dependentDob: "9/21/1998",
          dependentRelation: "daughter",
          liveTogether: "Yes",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alpha M Bah",
      emrPhone: "4713421824",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "brother",
      emrSex: "M",
    },
    id: 3,
  },
  {
    first_name: "Edmond",
    middle_name: "D",
    last_name: "Sesay",
    sex: "F",
    dob: "2/28/1945",
    marital_status: "Married",
    member_type: "retired",
    hometown: "Gainesville",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        spouseFirstName: "Marina",
        spouseLastName: "Sesay",
        address: {
          spouseStreet: "13796 Merrybrook CT",
          spouseApt: "Apt 302",
          spouseCity: "Herndon",
          spouseState: "VA",
          spouseZip: "20171",
        },
        spouseDob: "12/22/1968",
        spouseSex: "F",
        spouseNationality: "American",
      },
      dependents: [
        {
          dependentName: "Franklyn Thomas",
          dependentSex: "M",
          dependentDob: "12/4/2018",
          dependentRelation: "son",
          liveTogether: "No",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alpha M Bah",
      emrPhone: "4713421824",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "brother",
      emrSex: "M",
    },
    id: 4,
  },
  {
    first_name: "Aminata",
    last_name: "Labor-Koroma",
    sex: "F",
    dob: "08/06/1985",
    marital_status: "Married",
    member_type: "family",
    hometown: "Labor-ya",
    nationality: "Sierra Leonean",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        spouseFirstName: "Amara",
        spouseLastName: "Jaward",
        address: {
          spouseStreet: "13796 Merrybrook CT",
          spouseApt: "302",
          spouseCity: "Herndon",
          spouseState: "VA",
          spouseZip: "20171",
        },
        spouseDob: "12388",
        spouseSex: "M",
        spouseNationality: "American",
      },
      dependents: [
        {
          dependentName: "Katie Seray",
          dependentSex: "F",
          dependentDob: "12/12/2008",
          dependentRelation: "daughter",
          liveTogether: "Yes",
        },
        {
          dependentName: "Fatmata Kabba",
          dependentSex: "F",
          dependentDob: "12/13/2000",
          dependentRelation: "daughter",
          liveTogether: "No",
        },
      ],
    },
    emergencyContact: {
      emrName: "Amara Jaward",
      emrPhone: "5714716384",
      emrEmail: "4jayamara@gmail.com",
      emrRelation: "uncle",
      emrSex: "M",
    },
    id: 5,
    middle_name: "",
  },
  {
    first_name: "Amara",
    middle_name: "Tamia",
    last_name: "Jaward",
    sex: "M",
    dob: "12/3/1972",
    marital_status: "Single",
    member_type: "singleFamily",
    hometown: "Gainesville",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court Apt 204",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
        spouseFirstName: "Alpha",
        spouseLastName: "Bah",
        spousePhone: "4713421824",
        spouseEmail: "alphambah90@gmail.com",
        spouseStreet: "13701 Shrewsbury Court Apt 204",
        spouseCity: "Herndon",
        spouseState: "VA",
        spouseZip: "20171",
        spouseDob: "12/12/1978",
        spouseSex: "Male",
        spouseNationality: "American",
      },
      dependents: [
        {
          dependentName: "Mamusu Conteh",
          dependentSex: "F",
          dependentDob: "1/11/1944",
          dependentRelation: "grandMother",
          liveTogether: "Yes",
        },
        {
          dependentName: "Jayden Big-boy",
          dependentSex: "M",
          dependentDob: "5/16/2017",
          dependentRelation: "Nephew",
          liveTogether: "No",
        },
      ],
    },
    emergencyContact: {
      emrName: "Amara Jaward",
      emrPhone: "5714716384",
      emrEmail: "4jayamara@gmail.com",
      emrSex: "M",
      emrRelation: "brother",
    },
    id: 6,
  },
  {
    first_name: "Jeffery",
    middle_name: "D",
    last_name: "Koroma",
    sex: "M",
    dob: "9/2/1983",
    marital_status: "Single",
    member_type: "single",
    hometown: "Herndon",
    nationality: "American",
    phone: "5714716384",
    email: "4jayamara@gmail.com",
    address: {
      street: "13796 Merrybrook Court",
      apt: "Apt 302",
      city: "Herndon",
      state: "Virginia",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
        "": "13701 Shrewsbury Court Apt 204",
        spouseFirstName: "Amara",
        spouseLastName: "Jaward",
        spouseDob: "12388",
        spouseSex: "F",
        spouseLastNationality: "a",
        spouseNationality: "American",
        spousePhone: "5714716386",
        spouseEmail: "4jayamara@gmail.com",
        spouseStreet: "2401 Little Current Drive",
        spouseCity: "Herndon",
        sposueState: "Virginia",
        spouseZip: "20171",
        spouseState: "VA",
        spouseApt: "302",
      },
      dependents: [
        {
          dependentName: "Charles Sesay",
          dependentSex: "M",
          dependentDob: "12345",
          dependentRelation: "Brother",
          liveTogether: "No",
        },
        {
          dependentName: "Aminata Koroma",
          dependentSex: "F",
          dependentDob: "12345",
          dependentRelation: "Wife",
          liveTogether: "Yes",
        },
        {
          dependentName: "Adama Bah",
          dependentSex: "F",
          dependentDob: "123456",
          dependentRelation: "Niece",
          liveTogether: "Yes",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alfreda Kamara",
      emrSex: "M",
      dependentRelation: "n",
      emrPhone: "4534356789",
      emrEmail: "testemail@gmail.com",
      emrRelation: "Aunt",
    },
    id: 9,
  },
  {
    first_name: "Haja",
    middle_name: "Mariama",
    last_name: "Kamara",
    sex: "F",
    dob: "12/3/1971",
    marital_status: "Single",
    member_type: "singleFamily",
    hometown: "Magburaka",
    nationality: "American",
    phone: "4713536398",
    email: "testemail@yahoo.com",
    address: {
      street: "123 Test Drive",
      apt: "B",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
      },
      dependents: [
        {
          dependentName: "Yeabu Kamara",
          dependentSex: "F",
          dependentDob: "5/23/1942",
          dependentRelation: "mother",
          liveTogether: "Yes",
        },
        {
          dependentName: "Mohamed Kamara",
          dependentSex: "M",
          dependentDob: "8/24/2010",
          dependentRelation: "son",
          liveTogether: "Yes",
        },
      ],
    },
    emergencyContact: {
      emrName: "Santique Bangura",
      emrPhone: "4513246785",
      emrEmail: "test@email.com",
      emrRelation: "uncle",
      emrSex: "M",
    },
    id: 10,
  },
  {
    first_name: "Isha",
    middle_name: "Haja",
    last_name: "Koroma",
    sex: "F",
    dob: "12/4/46",
    marital_status: "Single",
    member_type: "retired",
    hometown: "Herndon",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "Apt 302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
      },
      dependents: [],
    },
    emergencyContact: {
      emrName: "Alpha M Bah",
      emrPhone: "4713421824",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "uncle",
      emrSex: "M",
    },
    id: 14,
  },
  {
    first_name: "Amara",
    middle_name: "Tamia",
    last_name: "Jaward",
    sex: "M",
    dob: "12/3/1972",
    marital_status: "Single",
    member_type: "singleFamily",
    hometown: "Herndon",
    nationality: "Sierra Leonean",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
      },
      dependents: [
        {
          dependentName: "Bintu Koroma",
          dependentSex: "F",
          dependentDob: "10/23/2000",
          dependentRelation: "sister",
          liveTogether: "Yes",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alpha Mohamed",
      emrPhone: "4713421824",
      emrEmail: "alphambah@gmail.com",
      emrRelation: "brother",
      emrSex: "M",
    },
    id: 15,
  },
  {
    first_name: "Amara",
    middle_name: "T",
    last_name: "Jaward",
    sex: "M",
    dob: "08/06/1985",
    marital_status: "Married",
    member_type: "family",
    hometown: "Herndon",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        spouseFirstName: "Alphina",
        spouseLastName: "Bah",
        address: {
          spouseStreet: "13701 Shrewsbury Court",
          spouseApt: "302",
          spouseCity: "Herndon",
          spouseState: "VA",
          spouseZip: "20171",
        },
        spouseDob: "12388",
        spouseSex: "F",
        spouseNationality: "American",
      },
      dependents: [
        {
          dependentName: "",
          dependentSex: "",
          dependentDob: "",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alpha M Bah",
      emrPhone: "4713421824",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "father",
      emrSex: "M",
    },
    id: 16,
  },
  {
    first_name: "Sheku",
    middle_name: "Baimoi",
    last_name: "Koroma",
    sex: "F",
    dob: "7/12/1968",
    marital_status: "Married",
    member_type: "retired",
    hometown: "Vaama Barrie",
    nationality: "Sierra Leonean",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court",
      apt: "203",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        spouseFirstName: "Haja Jeneba",
        spouseLastName: "Kamara",
        address: {
          spouseStreet: "13701 Shrewsbury Court",
          spouseApt: "200",
          spouseCity: "Herndon",
          spouseState: "VA",
          spouseZip: "20171",
        },
        spouseDob: "12/12/1976",
        spouseSex: "F",
        spouseNationality: "Sierra Leonean",
      },
      dependents: [
        {
          dependentName: "James Amara",
          dependentSex: "M",
          dependentDob: "12/23/2020",
          dependentRelation: "brother",
          liveTogether: "Yes",
        },
      ],
    },
    emergencyContact: {
      street: "13701 Shrewsbury Court",
      apt: "101",
      city: "Herndon",
      state: "VA",
      zip: "20171",
      emrSex: "F",
      emrName: "Fatmata Koroma",
      emrPhone: "4713421825",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "Aunt",
    },
    id: 17,
    street: "13701 Shrewsbury Court",
  },
  {
    first_name: "Hassan",
    middle_name: "Khalil",
    last_name: "Kamara",
    sex: "M",
    dob: "12/13/1990",
    marital_status: "Married",
    member_type: "family",
    hometown: "Gainesville",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Farm Crest",
      apt: "1021",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        spouseFirstName: "Yankain",
        spouseLastName: "Kamara",
        address: {
          spouseStreet: "13796 Merry Brook Court",
          spouseCity: "HERNDON",
          spouseState: "Virginia",
          spouseZip: "20171",
        },
        spouseDob: "12/13/1992",
        spouseSex: "F",
        spouseNationality: "American",
      },
      dependents: [
        {
          dependentName: "Musu Kamara",
          dependentSex: "F",
          dependentDob: "2/12/1998",
          dependentRelation: "daughter",
          liveTogether: "Yes",
        },
        {
          dependentName: "Mohamed Nooru Kamara",
          dependentSex: "M",
          dependentDob: "2/13/2018",
          dependentRelation: "son",
          liveTogether: "Yes",
        },
      ],
    },
    emergencyContact: {
      emrName: "Alpha M Bah",
      emrPhone: "4713421824",
      emrEmail: "alphambah90@gmail.com",
      emrRelation: "brother",
      emrSex: "M",
    },
    id: 18,
  },
  {
    first_name: "Amara",
    middle_name: "T",
    last_name: "Jaward",
    sex: "M",
    dob: "08/06/1980",
    marital_status: "Married",
    member_type: "family",
    hometown: "Herndon",
    nationality: "American",
    phone: "4713421824",
    email: "alphambah90@gmail.com",
    address: {
      street: "13701 Shrewsbury Court Apt 204",
      apt: "302",
      city: "Herndon",
      state: "VA",
      zip: "20171",
    },
    household: {
      spouse: {
        address: {},
      },
      dependents: [],
    },
    emergencyContact: {},
    id: 19,
  },
];
