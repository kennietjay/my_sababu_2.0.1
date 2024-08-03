import React from "react";

const DonationTemplate = ({
  recipientName,
  recipientLastName,
  donationAmount = templateData.donationAmount,
  donationDate = templateData.donationDate,
  itemDonation,
  receiptLink,
  donation = donationAmount ? `$${donationAmount}` : itemDonation,
}) => (
  <div>
    <h2>
      Thank you for your generous donation, {recipientName}, {recipientLastName}
      !
    </h2>
    <p>
      We have received your donation of {donation} on {donationDate}
    </p>
    <p>
      Your support helps us continue our mission and make a difference in the
      community.
    </p>
    <p>
      If you have any questions or need further information, feel free to
      contact us at this email sababufund@gmail.com or phone number -
      571-471-6384.
    </p>
    <br />
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

export default DonationTemplate;
