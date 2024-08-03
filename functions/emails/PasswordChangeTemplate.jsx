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
    <p>The Sababu Fund Team</p>
  </div>
);

export default PasswordChangeTemplate;
