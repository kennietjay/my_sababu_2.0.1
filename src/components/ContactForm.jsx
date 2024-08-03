import { useState } from "react";
import Button from "./Button";
import styles from "./ContactForm.module.css";
import { Alert } from "react-bootstrap";

function ContactForm({
  formData,
  setFormData,
  errorMsg,
  setErrorMsg,
  handleChangeInput,
  handleSubmit,
  loading,
}) {
  //
  return (
    <section className={`${"section sectionLayout"}`}>
      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <h3 className={`${"headingSecondary"} ${styles.contactFormHeader}`}>
            Get in Touch
          </h3>

          <div className={styles.alertBox}>
            {errorMsg && (
              <Alert
                variant="warning"
                dismissible
                onClose={() => setErrorMsg("")}
              >
                {errorMsg}
              </Alert>
            )}
          </div>
          <div className={styles.formControl}>
            <div className={`${"formGrid columnTwo"} ${styles.inputControl}`}>
              <div>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChangeInput}
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChangeInput}
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  name="phone"
                  type="phone"
                  value={formData.phone}
                  onChange={handleChangeInput}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChangeInput}
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>
          <div className={styles.formControl}>
            <div htmlFor="message">Message:</div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              rows="5"
              cols="33"
              maxLength="300"
              onChange={handleChangeInput}
              placeholder="Write a brief message.."
            ></textarea>
          </div>
          <div>
            <Button type="primary" disabled={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
