import React from "react";

const RegistrationTemplate = ({
  recipientName,
  recipientLastName,
  registrationDate = templateData.registrationDate,
  welcomeLink,
  email,
}) => (
  <div>
    <h2>Welcome to Sababu Fund, {recipientName}!</h2>
    <p>
      Thank you for registering on {registrationDate}. We are excited to have
      you as a member of our community.
    </p>
    <p>Registration details:</p>
    <ul>
      <li>First name:{recipientName}</li>
      <li>Last name:{recipientLastName}</li>
      <li>Email:{email}</li>
    </ul>
    <p>
      If you have any questions or need further assistance, feel free to contact
      us at sababufund@gmail.com.
    </p>
    <p>Best regards,</p>
    <p>
      Sababu Fund Team
      <br />
      Sababu Fund Inc.
      <br />
      Email: sababufund@gmail.com
      <br />
      Visit us online:{" "}
      <a href="http://www.sababufund.org">www.sababufund.org</a>
    </p>
  </div>
);

export default RegistrationTemplate;
