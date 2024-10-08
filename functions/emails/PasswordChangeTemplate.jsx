import React from "react";

const PasswordChangeTemplate = ({ recipientName, changeDate }) => (
  <div>
    <h1>Password Change Confirmation</h1>
    <p>Hi {recipientName},</p>
    <p>
      We wanted to let you know that your password was changed successfully on{" "}
      {changeDate}.
    </p>
    <p>If you did not make this change, please contact us immediately.</p>
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

export default PasswordChangeTemplate;
