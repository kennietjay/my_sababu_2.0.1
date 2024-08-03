import React, { useEffect, useState } from "react";
import styles from "./Volunteer.module.css";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useVolunteer } from "../contexts/VolunteerConntext";
import { submitVolunteerForm } from "../../utils/sendEmails";

function Volunteer() {
  const { getVolunteers } = useVolunteer();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
  });

  useEffect(() => {
    getVolunteers();
  }, [getVolunteers]);

  // console.log(volunteers);

  return (
    <main className={styles.volunteer}>
      <HeroSection />
      <VolunteerForm formData={formData} setFormData={setFormData} />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <>
      <AppNav />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Join Our Volunteer Team</h1>
          <p>
            Your time and skills can help make a difference in our community.
          </p>
        </div>
      </section>
    </>
  );
}

function VolunteerForm({ formData, setFormData }) {
  const { createVolunteer, getVolunteers } = useVolunteer();

  // Unified state change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save references to the registration or members table
      const newVolunteer = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
        availability: formData.availability,
      };

      await createVolunteer(newVolunteer);
      await submitVolunteerForm(formData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skills: "",
        availability: "",
      });
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <section className={`${"section"} `}>
      <div className={styles.volunteer}>
        <h2 className="headingSecondary">
          Sababu Fund is a Team of Volunteers
        </h2>
        <p>
          Sababu Fund Inc. stands as a testament to the incredible potential of
          volunteerism in driving our mission and vision and ensuring a social
          change in the communities we operate. Through the unwavering
          commitment of its volunteer team, the organization not only unite the
          community but also builds a sense of solidarity and shared purpose. As
          they look to the future, Sababu Fund Inc. remains dedicated to
          empowering communities and transforming lives, one volunteer at a
          time.
        </p>
        <h3 className="headingTertiary">
          Join our team annd help make a difference.
        </h3>
      </div>
      <div className={styles.volunteerContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className="headingSecondary">Sign Up to Volunteer</h2>
          <div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="skills">Skills</label>
              <textarea
                id="skills"
                name="skills"
                rows="4"
                placeholder="Describe your skills and experience"
                value={formData.skills || ""}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={styles.availabilityOptions}>
              <h3 className="headingTertiary">Availability</h3>
              <div className="">
                <div className={styles.availabilityOption}>
                  <label htmlFor="weekdays">
                    Weekdays
                    <input
                      type="radio"
                      id="weekdays"
                      name="availability"
                      value="Weekdays"
                      checked={formData.availability === "Weekdays"}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={styles.availabilityOption}>
                  <label htmlFor="weekends">
                    Weekends
                    <input
                      type="radio"
                      id="weekends"
                      name="availability"
                      value="Weekends"
                      checked={formData.availability === "Weekends"}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={styles.availabilityOption}>
                  <label htmlFor="both">
                    Both
                    <input
                      type="radio"
                      id="both"
                      name="availability"
                      value="Both"
                      checked={formData.availability === "Both"}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" className="primary">
            Sign Up Now
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Volunteer;
