import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

import styles from "./MembershipCard.module.css";
import MembershipCardForm from "./MembershipCardForm";

function membershipCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSignupSuccess = () => {
    setShowSuccessMessage(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={"section"}>
      <div className={styles.mainContainer}>
        <div className={styles.sections}>
          <div className={styles.bgImage}>
            <img src="/images/sb_card_bg.jpeg" />
          </div>

          <div className={styles.signupDetails}>
            <h2 className={styles.signupHeading}>
              Get your lifetime Sababu Fund Membership Card.
            </h2>
            <p className={styles.signupDescription}>
              Card is valid as long as bearer stays active as Sababu Fund
              member.
            </p>

            <div className={styles.cardCost}>
              $10 per card, and one card per account/per family.
            </div>
          </div>
        </div>
        {showSuccessMessage && (
          <Alert
            className={styles.alert}
            variant="success"
            dismissible
            onClick={() => setShowSuccessMessage(false)}
          >
            Sign up successful! Check your email for confirmation.
          </Alert>
        )}
        <MembershipCardForm
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          onSuccess={handleSignupSuccess}
          setIsModalOpen={setIsModalOpen}
        />
        <div className={""}>
          <button onClick={openModal} className={styles.signupBtn}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default membershipCard;
