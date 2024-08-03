import React, { useState } from "react";
import Modal from "./Modal";
import styles from "./Form.module.css"; // Adjust the path accordingly
import { Alert } from "react-bootstrap";

function Form({ isOpen, closeModal, profileFormData, handleChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupExists, setSignupExists] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.modalContainer}>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <form className={styles.modalForm}>
          <h2>Edit Profile Information.</h2>

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
          {success && (
            <Alert className="text-green-500">Email sent successfully!</Alert>
          )}

          {profileFormData?.map((formData, index) => (
            <div className={styles.inputFields} key={index}>
              <div className={`${styles.formInputLayout} ${styles.twoCol}`}>
                <div className="mb-6 flex text-black">
                  <label className="block text-m font-medium text-gray-700 pr-8">
                    Member ID
                  </label>
                  <input
                    type="text"
                    id="member_id"
                    name="member_id"
                    value={formData.member_id || ""}
                    readOnly
                    className="mt-1 text-muted p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div
                className={`${styles.formInputLayout} ${styles.threeEqualCol}`}
              >
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="middle_name"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middle_name"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div
                className={`${styles.formInputLayout} ${styles.twoEqualCol}`}
              >
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-m font-medium text-gray-700"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street || ""}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className={`${styles.formInputLayout} ${styles.threeCol}`}>
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-m font-medium text-gray-700"
                    htmlFor="zip"
                  >
                    Zip
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            disabled={loading}
            type="submit"
            className="mt-4 w-full bg-customBrown-200 text-white p-2 rounded-2xl hover:bg-customBrown-300"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Form;
