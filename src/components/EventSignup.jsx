import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Alert } from "react-bootstrap";
import supabase from "../../utils/supabase";
import styles from "./EventSignup.module.css";
import { useEvents } from "../contexts/EventContext";
import { submitEventSignup } from "../../utils/sendEmails";

//@ts-ignore
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

const EventSignup = ({
  isOpen,
  closeModal,
  onSuccess,
  setIsOpen,
  setFormData,
  formData,
  handleChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupExists, setSignupExists] = useState("");
  const [success, setSuccess] = useState(false);

  // Only set meetingId when the component mounts
  const { createSignup, events, isLoading } = useEvents();

  const eventId = events.length > 0 ? events[0].id : null;

  // Ensure that the email field is not empty and contains a valid email format
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    // Ensure the 'member' field has a value
    if (
      formData.participantType === undefined ||
      formData.participantType === ""
    ) {
      setError("Please select if you are a member.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
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

    setError("");
    setLoading(true);

    const newUser = {
      participant_type: formData.participantType,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    };

    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      emailSubject: "Sign Up Confirmation",
      type: "event",
      templateData: {
        event: formData.event,
        eventDate: formData.eventDate,
        eventDetailsLink: "https://example.com/event-details",
      },
    };

    try {
      const { data: existingSignups, error: existingSignupsError } =
        await supabase
          .from("eventsignups")
          .select("*")
          .or(`email.eq.${formData.email},phone.eq.${formData.phone}`);

      if (existingSignupsError) throw existingSignupsError;

      if (existingSignups.length > 0) {
        setSignupExists("Email or phone number already exists.");
        setLoading(false);
        return false;
      }

      await createSignup(newUser, eventId);
      await submitEventSignup(emailData);

      setIsOpen(false);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        participantType: "",
        emailSubject: "Sign-up Confirmation",
        templateData: {
          date: "2024-07-07",
          time: "5:00 PM",
          venue: "Zoom",
          meetingLink:
            "https://us06web.zoom.us/j/87029572621?pwd=YWr9RLg5jT6Mobrb0H7Hlghy9TTeK6.1",
          meetingId: "870 2957 2621",
          passcode: "038273",
        },
      });

      setSuccess(true);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <h2>Sign Up for the Meeting</h2>

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
          <div className="mb-6 flex text-black">
            <label className="block text-m font-medium text-gray-700 pr-8">
              I am signing up as a:
            </label>
            <select
              type="select"
              id="participantType"
              name="participantType"
              value={formData.participantType}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="Member">Member</option>
              <option value="Guest">Guest</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-m font-medium text-gray-700"
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
              className="block text-m font-medium text-gray-700"
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            disabled={loading}
            type="primary"
            className="mt-4 w-full bg-customBrown-200 text-white p-2 rounded-2xl hover:bg-customBrown-300"
          >
            Sign Up
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EventSignup;
