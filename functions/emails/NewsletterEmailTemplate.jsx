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
    <p>The Sababu Fund Team</p>
  </div>
);

export default NewsletterTemplate;
