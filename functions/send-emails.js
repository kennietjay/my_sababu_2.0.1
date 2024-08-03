import React from "react";
import ReactDOMServer from "react-dom/server";
import { Resend } from "resend";
import Welcome from "./emails/WelcomeEmailTemplate.jsx";
import NewsletterTemplate from "./emails/NewsletterEmailTemplate.jsx";
import ContactUsTemplate from "./emails/ContactUsEmailTemplate.jsx";
import DonationTemplate from "./emails/DonationEmailTemplate.jsx";
import RegistrationTemplate from "./emails/RegistrationEmailTemplate.jsx";
import VolunteerTemplate from "./emails/VolunteerEmailTemplate.jsx";
import EventSignupTemplate from "./emails/EventSignupEmailTemplate.jsx";
import MembershipCardTemplate from "./emails/MembershipCardEmailTemplate.jsx";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request body is missing" }),
    };
  }

  let emailsData;
  try {
    emailsData = JSON.parse(event.body);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON input" }),
    };
  }

  if (!Array.isArray(emailsData) || emailsData.length === 0) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Request body must be a non-empty array of emails",
      }),
    };
  }

  const getTemplate = (type) => {
    switch (type) {
      case "newsletter":
        return NewsletterTemplate;
      case "contact":
        return ContactUsTemplate;
      case "donation":
        return DonationTemplate;
      case "register":
        return RegistrationTemplate;
      case "volunteer":
        return VolunteerTemplate;
      case "eventsignup":
        return EventSignupTemplate;
      case "membershipcard":
        return MembershipCardTemplate;
      default:
        return Welcome;
    }
  };

  const sendEmail = async (emailData) => {
    const {
      firstName,
      lastName,
      email,
      emailSubject,
      middleName,
      gender,
      phone,
      memberType,
      street,
      apt,
      city,
      state,
      zip,
      templateData,
      type,
    } = emailData;

    if (!email || typeof email !== "string") {
      throw new Error("The `email` field must be a `string`.");
    }

    const TemplateComponent = getTemplate(type);

    const emailContent = ReactDOMServer.renderToString(
      React.createElement(TemplateComponent, {
        recipientName: firstName,
        recipientLastMiddleName: middleName,
        recipientLastName: lastName,
        email,
        gender,
        memberType,
        phone,
        emailSubject,
        ...templateData,
      })
    );

    const { data, error } = await resend.emails.send({
      from: "Sababu Fund Media <NoReply@sababufund.org>",
      to: [email],
      subject: emailSubject,
      html: emailContent,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  try {
    const results = await Promise.all(emailsData.map(sendEmail));

    return {
      statusCode: 200,
      body: JSON.stringify({ data: results }),
    };
  } catch (err) {
    console.error("Exception:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
