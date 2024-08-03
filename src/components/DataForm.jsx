import React, { useState, useEffect } from "react";
import styles from "./DataForm.module.css";
import { titleCase } from "../../utils/titleCase";

const DataForm = ({
  initialData,
  onSave,
  onClose,
  type,
  isUserProfileEdit,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  // console.log("user:", user, "Dep:", initialData);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  console.log("isUserProfileEdit:", isUserProfileEdit);
  console.log("formData:", formData);

  return (
    <form onSubmit={handleSubmit} className={styles.dataForm}>
      <h2>{type ? titleCase(type) : ""} Form</h2>
      <div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="sex"
            value={formData.sex || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="text"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* {!isUserProfileEdit && ( */}
        <div>
          <label>Relationship:</label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship || ""}
            onChange={handleChange}
          />
        </div>
        {/* )} */}

        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Add other form fields as required */}
      <div className={styles.profileActions}>
        <button className={styles.saveBtn} type="submit">
          Save
        </button>
        <button className={styles.cancelBtn} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DataForm;

//
//
// import React, { useState, useEffect } from "react";
// import styles from "../pages/ProfilePage.module.css";
// import { titleCase } from "../../utils/titleCase";

// const DataForm = ({ initialData, onSave, onClose, type }) => {
//   const [formData, setFormData] = useState(initialData);

//   console.log(initialData);

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   console.log(type);

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2> {type ? titleCase(type) : ""} Form</h2>
//       <div>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData?.first_name || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Gender:</label>
//           <input
//             type="text"
//             name="gender"
//             value={formData?.gender || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Date of Birth:</label>
//           <input
//             type="text"
//             name="dob"
//             value={formData?.dob || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="last_name"
//             value={formData?.last_name || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Relationship:</label>
//           <input
//             type="text"
//             name="relationship"
//             value={formData?.relationship || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={formData?.email || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData?.phone || ""}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>

//       {/* Add other form fields as required */}
//       <div className={styles.profileActions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default DataForm;
