import React from "react";

const MembershipCardTemplate = ({
  recipientName,
  recipientMiddleName,
  recipientLastName,
  email,
  gender,
  memberType,
  address,
  registrationDate,
  websiteLink,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
    }}
  >
    <h3>Your Membership Card Awaits.</h3>
    <p>
      Dear {recipientName} {recipientLastName},
    </p>
    <p>
      Thank you for signing up for the Sababu Fund Inc membership card on{" "}
      {registrationDate}. We are thrilled to have you as part of our community
      dedicated to making a positive impact.
    </p>
    <p>
      Your membership card is being processed and will be available for pickup
      from any Sababu Fund exectuve member or mailed to you within 7-10 business
      days. Please review the information you provided:
    </p>
    <ul>
      <li>
        Name: {recipientName} {recipientMiddleName} {recipientLastName}
      </li>
      <li>Member Type: {memberType}</li>
      <li>Gender: {gender}</li>
      <li>Email: {email}</li>
      <li>Address: {address}</li>
    </ul>
    <p>
      Your membership card grants you access to exclusive benefits, including:
    </p>
    <ul>
      <li>Access to special events and networking opportunities.</li>
      <li>
        Community connections with like-minded individuals and professionals.
      </li>
      <li>Volunteer opportunities to contribute to our cause.</li>
    </ul>
    <p>
      For more details, visit our <a href={websiteLink}>website</a>. If you have
      any questions, our membership team is here to help.
    </p>
    <p>
      Thank you for your support. Together, we can drive change and make a
      difference.
    </p>
    <p>Warm regards,</p>
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

export default MembershipCardTemplate;
