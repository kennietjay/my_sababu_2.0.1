import React from "react";

const AccountSignupTemplate = ({
  recipientName,
  signupDate,
  accountDetails,
}) => (
  <div>
    <h1>Welcome to Sababu Fund, {recipientName}!</h1>
    <p>
      Thank you for creating an account with us on {signupDate}. We are thrilled
      to have you join our community.
    </p>
    <p>Account details:</p>
    <p>{accountDetails}</p>
    <p>
      If you have any questions or need assistance, feel free to reply to this
      email.
    </p>
    <p>Best regards,</p>
    <p>The Sababu Fund Team</p>
  </div>
);

export default AccountSignupTemplate;
