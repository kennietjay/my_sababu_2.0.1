import { titleCase } from "./titleCase";

export const sendEmail = async (emailData) => {
  const apiEndpoint =
    import.meta.env.NODE_ENV === "development"
      ? "/.netlify/functions/send-emails"
      : "/api/send-emails";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([emailData]),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Failed to send email:", errorData);
      throw new Error("Failed to send email.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

//

export const submitNewsletterForm = async (formData) => {
  const emailData = {
    name: formData.name,
    email: formData.email,
    emailSubject: "Newsletter Sign-Up Confirmation",
    type: "newsletter",
    templateData: {
      subscriptionDate: new Date().toLocaleDateString(),
      newsletterLink: "https://sababufund.org/home/newsletters/welcome",
    },
  };

  await sendEmail(emailData);
};

export const submitMembershipCardForm = async (formData) => {
  const emailData = {
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastName: formData.lastName,
    email: formData.email,
    emailSubject: "Membership Card Sign-Up Confirmation",
    type: "membershipcard",
    templateData: {
      phone: formData.phone,
      memberType: titleCase(formData.memberType),
      gender: titleCase(formData.gender),
      address: `${formData.street} ${formData.apt}, ${formData.city}, ${formData.state}. ${formData.zip}`,
      registrationDate: new Date().toLocaleDateString(),
      websiteLink: "https://sababufund.org",
    },
  };

  await sendEmail(emailData);
};

export const submitContactUsForm = async (formData) => {
  console.log(formData.templateData.message);

  const emailData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    emailSubject: "Contact Us Confirmation",
    type: "contact",
    templateData: {
      message: formData.templateData.message,
      contactDate: new Date().toLocaleDateString(),
      supportLink: "https://example.com/support",
    },
  };

  await sendEmail(emailData);
};

export const submitDonationForm = async (formData) => {
  console.log(formData);

  const emailData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    emailSubject: "Donation Confirmation",
    type: "donation",
    templateData: {
      donationAmount: formData.templateData.donationAmount,
      itemDonation: formData.templateData.itemDonation,
      donationDate: new Date().toLocaleDateString(),
      receiptLink: "https://example.com/receipt",
    },
  };

  await sendEmail(emailData);
};

export const submitRegisterForm = async (formData) => {
  const emailData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    emailSubject: "Registration Confirmation",
    type: "register",
    templateData: {
      registrationDate: new Date().toLocaleDateString(),
      welcomeLink: "https://example.com/welcome",
    },
  };

  await sendEmail(emailData);
};

export const submitVolunteerForm = async (formData) => {
  const emailData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    emailSubject: "Volunteer Sign-Up Confirmation",
    type: "volunteer",
    templateData: {
      volunteerEvent: formData.volunteerEvent,
      eventDate: formData.eventDate,
      eventDetailsLink: "https://example.com/event-details",
    },
  };

  await sendEmail(emailData);
};

export const submitEventSignup = async (formData) => {
  const emailData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    emailSubject: "Sign Up Confirmation",
    templateData: {
      event: formData.event,
      eventDate: formData.eventDate,
      type: "event",
      eventDetailsLink: "https://example.com/event-details",
    },
  };

  await sendEmail(emailData);
};
