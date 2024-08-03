import React from "react";

const Welcome = ({
  recipientName,
  recipientLastName,
  phone,
  recipientEmail,
  emailSubject,
  meetingLink,
  meetingId,
  passcode,
  participantType,
}) => (
  <div>
    <h2>
      Welcome {recipientName} {recipientLastName}!
    </h2>
    <p>
      We're excited to have you as a {participantType}. Below are your meeting
      details:
    </p>
    <p>Meeting ID: {meetingId}</p>
    <p>Passcode: {passcode}</p>
    <p>
      Join the meeting <a href={meetingLink}>here</a>.
    </p>
    <p>
      If you have any questions, feel free to reach out to us at{" "}
      {recipientEmail} or call us at {phone}.
    </p>
  </div>
);

export default Welcome;
