//
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import CardModal from "./CardModal";
import styles from "./MembershipCardForm.module.css";
import supabase from "../../utils/supabase";
import { useMembershipCards } from "../contexts/MembershipCardContext";
import { submitMembershipCardForm } from "../../utils/sendEmails";

const recognizedEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
];

const isValidEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isRecognizedEmailDomain = (email) => {
  const domain = email.split("@")[1];
  return recognizedEmailDomains.includes(domain) || domain.endsWith(".org");
};

const isValidUSPhone = (phone) => {
  const phoneRegex =
    /^\(?([2-9][0-9]{2})\)?[-.●]?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

const formatPhoneNumber = (value) => {
  const cleaned = ("" + value).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return `${match[1]}${match[2] ? `-${match[2]}` : ""}${
      match[3] ? `-${match[3]}` : ""
    }`;
  }
  return value;
};

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  phone: "",
  memberType: "",
  emailSubject: "Sign-up Confirmation",
  templateData: {
    sigupDate: new Date(),
  },
};

const MembershipCardForm = ({
  isModalOpen,
  closeModal,
  onSuccess,
  setIsModalOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupExists, setSignupExists] = useState("");
  const [formData, setFormData] = useState(initialState);

  const { createSignup, isLoading } = useMembershipCards();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let newValue = value;

    if (name === "phone") {
      newValue = formatPhoneNumber(value);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const resetForm = () => {
    setFormData(initialState);
    setError(null);
    setSignupExists("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSignupExists("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.memberType ||
      !formData.gender ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmailFormat(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isRecognizedEmailDomain(formData.email)) {
      setError(
        "Please use an email from recognized domains like Gmail, Yahoo, or .org domains."
      );
      return;
    }

    if (!isValidUSPhone(formData.phone)) {
      setError("Please enter a valid US phone number.");
      return;
    }

    setLoading(true);

    const newUser = {
      member_type: formData.memberType,
      gender: formData.gender,
      first_name: formData.firstName,
      last_name: formData.lastName,
      middle_name: formData.middleName,
      email: formData.email,
      phone: formData.phone,
      street: formData.street,
      apt: formData.apt,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    try {
      const { data: existingSignups, error: existingSignupsError } =
        await supabase
          .from("membership_cards_dev")
          .select("*")
          .or(`email.eq.${formData.email},phone.eq.${formData.phone}`);

      if (existingSignupsError) throw existingSignupsError;

      if (existingSignups.length > 0) {
        setSignupExists("Email or phone number already exists.");
        setLoading(false);
        return;
      }

      await createSignup(newUser);
      setIsModalOpen(false);

      const emailData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        memberType: formData.memberType,
        gender: formData.gender,
        street: formData.street,
        apt: formData.apt,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        email: formData.email,
        emailSubject: "Registration Confirmation",
        type: "register",
        templateData: {
          registrationDate: new Date().toLocaleDateString(),
        },
      };

      await submitMembershipCardForm(emailData);

      resetForm();
      onSuccess();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        className={styles.modal}
      >
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <button
            onClick={closeModal}
            type="button"
            className={styles.closeBtn}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>Sign Up for Membership Card</h2>

          {signupExists && (
            <Alert
              variant="warning"
              dismissible
              onClose={() => setSignupExists("")}
            >
              {signupExists}
            </Alert>
          )}

          {error && <Alert className="text-red-500">{error}</Alert>}
          <div className={`${styles.grid} ${styles.gridCols2}`}>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="memberType"
              >
                Member Type
              </label>
              <select
                id="memberType"
                name="memberType"
                value={formData.memberType}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="single-family">Single Family</option>
                <option value="family">Family</option>
                <option value="senior-citizen">Senior Citizen</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className={`${styles.grid} ${styles.gridCols3}`}>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="middleName"
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div
            className={`${styles.grid} ${styles.gridCols2} ${styles.oneSmall}`}
          >
            <div className="col-span-9 mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="street"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-3 mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="apt"
              >
                Apt
              </label>
              <input
                type="text"
                id="apt"
                name="apt"
                value={formData.apt}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div
            className={`${styles.grid} ${styles.gridCols3} ${styles.twoSmall}`}
          >
            <div className="col-span-6 mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div
              className={`"col-span-3 mb-6" ${styles.fieldWrapper} ${styles.selectWrapper}`}
            >
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="state"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select
                </option>
                {USStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-3 mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="zip"
              >
                Zip
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.gridCols2} `}>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-base font-bold text-gray-700"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="571-123-4567"
              />
            </div>
          </div>
          <button disabled={loading} type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>
      </CardModal>
    </div>
  );
};

export default MembershipCardForm;

const USStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
];

//
//
// import React, { useEffect, useState } from "react";
// import { Alert } from "react-bootstrap";
// import CardModal from "./CardModal";
// import styles from "./MembershipCardForm.module.css";
// import supabase from "../../utils/supabase";
// import { useMembershipCards } from "../contexts/MembershipCardContext";
// import { submitMembershipCardForm } from "../../utils/sendEmails";

// // import { submitRegisterForm } from "../utils/sendEmails";

// //@ts-ignore
// const recognizedEmailDomains = [
//   "gmail.com",
//   "yahoo.com",
//   "ymail.com",
//   "outlook.com",
//   "hotmail.com",
//   "live.com",
//   "icloud.com",
//   "me.com",
//   "mac.com",
//   "aol.com",
//   "protonmail.com",
//   "zoho.com",
//   "mail.com",
//   "gmx.com",
//   "gmx.net",
// ];

// const isValidEmailFormat = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// const isRecognizedEmailDomain = (email) => {
//   const domain = email.split("@")[1];
//   return recognizedEmailDomains.includes(domain) || domain.endsWith(".org");
// };

// const isValidUSPhone = (phone) => {
//   const phoneRegex =
//     /^\(?([2-9][0-9]{2})\)?[-.●]?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
//   return phoneRegex.test(phone);
// };

// const MembershipCardForm = ({
//   isModalOpen,
//   closeModal,
//   onSuccess,
//   setIsModalOpen,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [signupExists, setSignupExists] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     gender: "",
//     street: "",
//     apt: "",
//     city: "",
//     state: "",
//     zip: "",
//     email: "",
//     phone: "",
//     memberType: "",
//     emailSubject: "Sign-up Confirmation",
//     templateData: {
//       sigupDate: new Date(),
//     },
//   });

//   // Only set meetingId when the component mounts
//   const { createSignup, isLoading } = useMembershipCards();

//   //
//   const handleChange = (e) => {
//     const { name, value, type, radio } = e.target;

//     if (type === "radio") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   // Ensure that the email field is not empty and contains a valid email format
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError(null);

//     // Ensure the 'member' field has a value
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.memberType ||
//       !formData.gender ||
//       !formData.street ||
//       !formData.city ||
//       !formData.state ||
//       !formData.zip
//     ) {
//       setError("All fields are required");
//       return;
//     }

//     if (!isValidEmailFormat(formData.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!isRecognizedEmailDomain(formData.email)) {
//       setError(
//         "Please use an email from recognized domains like Gmail, Yahoo, or .org domains."
//       );
//       return;
//     }

//     if (!isValidUSPhone(formData.phone)) {
//       setError("Please enter a valid US phone number.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     const newUser = {
//       member_type: formData.memberType,
//       gender: formData.gender,
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       middle_name: formData.middleName,
//       email: formData.email,
//       phone: formData.phone,
//       street: formData.street,
//       apt: formData.apt,
//       city: formData.city,
//       state: formData.state,
//       zip: formData.zip,
//     };

//     console.log(newUser);

//     try {
//       const { data: existingSignups, error: existingSignupsError } =
//         await supabase
//           .from("membership_cards")
//           .select("*")
//           .or(`email.eq.${formData.email},phone.eq.${formData.phone}`);

//       if (existingSignupsError) throw existingSignupsError;

//       if (existingSignups.length > 0) {
//         setSignupExists("Email or phone number already exists.");
//         setLoading(false);
//         return false;
//       }

//       await createSignup(newUser);
//       setIsModalOpen(false);

//       //
//       const emailData = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         middleName: formData.middleName,
//         memberType: formData.memberType,
//         gender: formData.gender,
//         street: formData.street,
//         apt: formData.apt,
//         city: formData.city,
//         state: formData.state,
//         zip: formData.zip,
//         email: formData.email,
//         emailSubject: "Registration Confirmation",
//         type: "register",
//         templateData: {
//           registrationDate: new Date().toLocaleDateString(),
//         },
//       };

//       await submitMembershipCardForm(emailData);
//       //
//       setFormData({
//         firstName: "",
//         lastName: "",
//         middleName: "",
//         memberType: "",
//         gender: "",
//         street: "",
//         apt: "",
//         city: "",
//         state: "",
//         zip: "",
//         email: "",
//         emailSubject: "Membership Card Sign-Up Confirmation",
//         type: "register",
//         templateData: {
//           registrationDate: new Date().toLocaleDateString(),
//         },
//       });

//       // setSuccess(true);
//       onSuccess();
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <CardModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         className={styles.modal}
//       >
//         <form onSubmit={handleSubmit} className={styles.signupForm}>
//           <button
//             onClick={closeModal}
//             type="button"
//             className={styles.closeBtn}
//           >
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//           <h2>Sign Up for Membership Card</h2>

//           {signupExists && (
//             <Alert
//               variant="warning"
//               dismissible
//               onClose={() => setSignupExists("")}
//             >
//               {signupExists}
//             </Alert>
//           )}

//           {error && <Alert className="text-red-500">{error}</Alert>}
//           <div className={`${styles.grid} ${styles.gridCols2}`}>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="memberType"
//               >
//                 Member Type
//               </label>
//               <select
//                 type="text"
//                 id="memberType"
//                 name="memberType"
//                 value={formData.memberType}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="single">Single</option>
//                 <option value="single-family">Single Family</option>
//                 <option value="family">Family</option>
//                 <option value="senior-citizen">Senior Citizen</option>
//               </select>
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="gender"
//               >
//                 Gender
//               </label>
//               <select
//                 type="text"
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//           </div>

//           <div className={`${styles.grid} ${styles.gridCols3}`}>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="firstName"
//               >
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="middleName"
//               >
//                 Middle Name
//               </label>
//               <input
//                 type="text"
//                 id="middleName"
//                 name="middleName"
//                 value={formData.middleName}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="lastName"
//               >
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <div
//             className={`${styles.grid} ${styles.gridCols2} ${styles.oneSmall}`}
//           >
//             <div className="col-span-9 mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="street"
//               >
//                 Street
//               </label>
//               <input
//                 type="text"
//                 id="street"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="col-span-3 mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="apt"
//               >
//                 Apt
//               </label>
//               <input
//                 type="text"
//                 id="apt"
//                 name="apt"
//                 value={formData.apt}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <div
//             className={`${styles.grid} ${styles.gridCols3} ${styles.twoSmall}`}
//           >
//             <div className="col-span-6 mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="city"
//               >
//                 City
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="col-span-3 mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="state"
//               >
//                 State
//               </label>
//               <select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               >
//                 <option value="" disabled>
//                   Select
//                 </option>
//                 {USStates.map((state) => (
//                   <option key={state.value} value={state.value}>
//                     {state.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="col-span-3 mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="zip"
//               >
//                 Zip
//               </label>
//               <input
//                 type="text"
//                 id="zip"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <div className={`${styles.grid} ${styles.gridCols2} `}>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-base font-bold text-gray-700"
//                 htmlFor="phone"
//               >
//                 Phone
//               </label>
//               <input
//                 type="phone"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>
//           <button disabled={loading} type="submit" className={styles.submitBtn}>
//             Sign Up
//           </button>
//         </form>
//       </CardModal>
//     </div>
//   );
// };

// export default MembershipCardForm;

// const USStates = [
//   { value: "AL", label: "Alabama" },
//   { value: "AK", label: "Alaska" },
//   { value: "AZ", label: "Arizona" },
//   { value: "AR", label: "Arkansas" },
//   { value: "CA", label: "California" },
//   { value: "CO", label: "Colorado" },
//   { value: "CT", label: "Connecticut" },
//   { value: "DE", label: "Delaware" },
//   { value: "FL", label: "Florida" },
//   { value: "GA", label: "Georgia" },
//   { value: "HI", label: "Hawaii" },
//   { value: "ID", label: "Idaho" },
//   { value: "IL", label: "Illinois" },
//   { value: "IN", label: "Indiana" },
//   { value: "IA", label: "Iowa" },
//   { value: "KS", label: "Kansas" },
//   { value: "KY", label: "Kentucky" },
//   { value: "LA", label: "Louisiana" },
//   { value: "ME", label: "Maine" },
//   { value: "MD", label: "Maryland" },
//   { value: "MA", label: "Massachusetts" },
//   { value: "MI", label: "Michigan" },
//   { value: "MN", label: "Minnesota" },
//   { value: "MS", label: "Mississippi" },
//   { value: "MO", label: "Missouri" },
//   { value: "MT", label: "Montana" },
//   { value: "NE", label: "Nebraska" },
//   { value: "NV", label: "Nevada" },
//   { value: "NH", label: "New Hampshire" },
//   { value: "NJ", label: "New Jersey" },
//   { value: "NM", label: "New Mexico" },
//   { value: "NY", label: "New York" },
//   { value: "NC", label: "North Carolina" },
//   { value: "ND", label: "North Dakota" },
//   { value: "OH", label: "Ohio" },
//   { value: "OK", label: "Oklahoma" },
//   { value: "OR", label: "Oregon" },
//   { value: "PA", label: "Pennsylvania" },
//   { value: "RI", label: "Rhode Island" },
//   { value: "SC", label: "South Carolina" },
//   { value: "SD", label: "South Dakota" },
//   { value: "TN", label: "Tennessee" },
//   { value: "TX", label: "Texas" },
//   { value: "UT", label: "Utah" },
//   { value: "VT", label: "Vermont" },
//   { value: "VA", label: "Virginia" },
//   { value: "WA", label: "Washington" },
//   { value: "WV", label: "West Virginia" },
//   { value: "WI", label: "Wisconsin" },
//   { value: "WY", label: "Wyoming" },
//   { value: "DC", label: "District of Columbia" },
// ];
