import React from "react";

const NewsletterTemplate = ({
  subscriptionDate = templateData.subscriptionDate,
  newsletterLink,
}) => (
  <div>
    <h2>Welcome to our Newsletters!</h2>
    <p>
      Thank you for signing up on {subscriptionDate}. We look forward to keeping
      you updated with our latest news and events.
    </p>
    <p>
      You can read our latest newsletter <a href={newsletterLink}>here</a>.
    </p>
    <p>
      If you have any questions or feedback, feel free to contact us at
      sababufund@gmail.com.
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

export default NewsletterTemplate;
