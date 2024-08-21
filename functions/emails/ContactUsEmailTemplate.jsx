import React from "react";

const ContactUsTemplate = ({
  recipientName,
  recipientLastName,
  contactDate,
  message = templateData.message,
}) => (
  <div>
    <h2>
      Thank you for contacting us, {recipientName} {recipientLastName}!
    </h2>
    <p>
      We have received your message sent on {contactDate}. Our team will review
      your inquiry and get back to you as soon as possible.
    </p>
    <p>Details of your inquiry: {message}</p>
    <p>We appreciate your patience.</p>
    <p>Best regards,</p>
    <p>Sababu Fund Team</p>
    <p>
      Sababu Fund Inc.
      <br />
      Email: sababufund@gmail.com
      <br />
      Visit us online:{" "}
      <a href="http://www.sababufund.org">www.sababufund.org</a>
    </p>
  </div>
);

export default ContactUsTemplate;
