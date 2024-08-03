import React from "react";

const VolunteerTemplate = ({
  recipientName,
  recipientLastName,
  volunteerEvent = templateData.volunteerEvent,
  eventDate = templateData.eventDate,
  eventDetailsLink = templateData.eventDetailsLink,
}) => (
  <div>
    <h1>Thank you for signing up to volunteer, {recipientName}!</h1>
    <p>
      We appreciate your willingness to help out. Here are the details of the
      upcoming event:
    </p>
    <p>Event Date: {volunteerDate}</p>
    <p>{eventDetailsLink}</p>
    <p>
      We look forward to working with you and making a positive impact together.
    </p>
    <p>If you have any questions, please reply to this email.</p>
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

export default VolunteerTemplate;
