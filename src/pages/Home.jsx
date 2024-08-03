import { useEffect, useState } from "react";
import AppNav from "../components/AppNav";
import Button from "../components/Button";
import Blogs from "../components/Blogs";
import styles from "./Home.module.css";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import SababuStat from "../components/SababuStat";
import { HashLink } from "react-router-hash-link";
import QuestionAnswerComponent from "../components/QuestionsAndAnswers";
// import EventSignup from "../components/EventSignup";
import { useEvents } from "../contexts/EventContext";
import Events from "./Events";
import { Alert } from "react-bootstrap";

const qaList = [
  {
    question: "What is Sababu Fund?",
    answer:
      "Sababu Fund is a community-based organization dedicated to supporting various community initiatives, including financial contributions for events, member support, and more. Our goal is to foster a supportive and engaged community.",
  },
  {
    question: "How can I contact Sababu Fund?",
    answer:
      "You can reach us via email at sababufund@gmail.com, or by using the contact form on our website.",
  },
  {
    question: "How do I become a member of Sababu Fund?",
    answer:
      "You can become a member by registering through our website. Downnload and fill out the membership application form and submit it. Our team will review your application, and upon approval, you will be added to the members' forum.",
  },
  {
    question: "What types of memberships are available?",
    answer:
      "We offer several types of memberships: single, family, single family, and senior citizens. Each type has its own benefits and fees.",
  },
  {
    question: "When does my membership expire?",
    answer:
      "Memberships expire every December 31st. You will need to renew your membership annually to maintain access to member benefits.",
  },
  {
    question: "What happens if my membership expires or is suspended?",
    answer:
      "If your membership expires or is suspended, you will not have access to your data in the members' table until you renew your membership.",
  },
  {
    question: "What types of events does Sababu Fund organize?",
    answer:
      "We organize a variety of events, including community meetings, funerals, and other special gatherings. Our events are designed to support and engage our community members.",
  },
  {
    question: "How can I contribute to an event?",
    answer:
      "You can make a financial contribution to an event through our website. Simply select the event you wish to support and follow the instructions to make a donation.",
  },
  {
    question: "Can I make a donation without logging in?",
    answer:
      "Yes, you can make a donation without logging in. We use your email and phone number to ensure that each donor can only make one donation per day.",
  },
  {
    question: "How do I sign up for newsletters or updates?",
    answer:
      "You can sign up for our newsletters and updates by filling out the newsletter signup form on our website. Stay informed about the latest news and events from Sababu Fund.",
  },
  {
    question: "How do I volunteer for Sababu Fund?",
    answer:
      "If you are interested in volunteering, please fill out the volunteer form on our website. We appreciate your willingness to support our community initiatives.",
  },
  {
    question:
      "I am having trouble with the website. Who can I contact for support?",
    answer:
      "If you encounter any issues with our website, please contact our technical support team at sababufund@gmail.com, call or message 5714716384 for assistance.",
  },
  {
    question: "How do I update my personal information?",
    answer:
      "Members can update their personal information during the renewal period. Members may be allowed to update their information for only life changing momnets by contacting the Sababu Fund support team. If you need further assistance, please contact our support team.",
  },
];

function Home() {
  const { getEvents, events } = useEvents();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleSignupSuccess = () => {
    setShowSuccessMessage(true);
  };

  console.log(events);

  return (
    <main className={` ${styles.home}`}>
      <AppNav />
      <HeroSection />
      <Tagline events={events} />
      <WhatWeOffer />
      <SababuStat />
      <CallToAction />
      <UpcomingEvents
        events={events}
        showSuccessMessage={showSuccessMessage}
        onSuccess={handleSignupSuccess}
        setShowSuccessMessage={setShowSuccessMessage}
      />
      <BlogPosts />
      <QuestionAnswerComponent qaList={qaList} />
      <NewsLetter />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <>
      <section className={styles.hero}></section>
    </>
  );
}

function Tagline({ events }) {
  const earliestEvent = getEarliestEvent(events);

  const formattedTime = formatTo12HourTime(earliestEvent?.time);
  return (
    <section className={`${"section"}`}>
      <div className={styles.heroContent}>
        <div className={styles.taglineContainer}>
          <h1 className={`${styles.tagline}`}>
            First time hearing about{" "}
            <span className={styles.taglineStyle}>Sababu Fund</span>?
          </h1>
          <p>
            A community platform designed to unite you on common values and
            empower you to discover opportunities.
          </p>

          <p className={styles.heroCallToActiion}>
            Contact us and let's discuss our community.
          </p>

          {earliestEvent !== null ? (
            <div className={styles.meeting}>
              <span>Join us on </span>
              <strong>
                <span>{splitDate(earliestEvent?.event_date).month}</span>
                <span> {splitDate(earliestEvent?.event_date).day},</span>
                <span> {splitDate(earliestEvent?.event_date).year} </span>
                <span> @ {formattedTime}</span>
              </strong>
              <span> | 2 hours meeting with members.</span>
            </div>
          ) : (
            <span className={styles.checkNoEvent}>
              Check later for an upcoming event
            </span>
          )}
        </div>
        <div className={styles.start}>
          <h1 className={styles.heroDescription}>
            You are one step away to a united, committed community.
          </h1>
          <HashLink smooth to="/membership#eligibility" className="cta">
            Learn more
          </HashLink>
        </div>
      </div>
    </section>
  );
}

function WhatWeOffer() {
  return (
    <div className={styles.whatWeOfferContainer}>
      <section className={`${"section sectionLayout"} ${styles.whatWeOffer}`}>
        <p className={`${"intro"}`}>What we offer</p>
        <ul>
          <li>A community united on common values and cultural practices.</li>
          <li>Community events and outreach programs.</li>
          <li>
            Financial contributions from a coordinated community contribution
            scheme and donations to support griefing families.
          </li>
          <li>
            Assist members with funeral arrangements, administrative services
            and repatriations.
          </li>
          <li>
            An audience that provides emotional and physical supports in
            challeging times of grieving.
          </li>
        </ul>
      </section>
    </div>
  );
}

function CallToAction() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <p className={`${"intro"}`}>Join us</p>
      <div className={`${"grid gridTwoCol"} ${styles.join}`}>
        <div className={styles.joinImage}>
          <img
            src="/images/sb-2023-agm-members-8.jpg"
            alt="A lady smiling and helping a man with paperwork"
          />
        </div>
        <div className={styles.joinContent}>
          <h1 className={`${"headingPrimary"}`}>
            My Sababu, a Supportive Community
          </h1>
          <p>
            The significance of providing emotional support to someone going
            through grief and emotional challenges cannot be overstated.
            Accessible peer support groups and online resources to help ease the
            burden of loss are crucial. Our objective is to promote healing and
            facilitate a healthy grieving process. Sababu Fund volunteers embody
            altruism, collaborating with the organization to enhance the
            community&apos;s future and advance its mission of positive change
            and empowerment.
          </p>
          {/* <div className={styles.joinBtns}>
            <HashLink smooth to="/membership#membership_type">
              <Button type="primary">Join today</Button>
            </HashLink>
            <HashLink smooth to="donate#top">
              <Button type="secondary">Donate Now</Button>
            </HashLink>
          </div> */}
          <div className={styles.joinBtns}>
            <HashLink smooth to="/contacts#top">
              <Button type="primary">Join today</Button>
            </HashLink>
            <HashLink smooth to="/contacts#top">
              <Button type="secondary">Donate Now</Button>
            </HashLink>
          </div>
        </div>
      </div>

      <div className={styles.joinDetails}>
        <h1 className={`${"headingPrimary"}`}>
          A Community-Driven Solution for Your Peace of Mind
        </h1>
        <p>
          Grieving the loss of a loved one is the hardest thing to deal with.
          Whether it is a spouse, partner, parent, child, a close friend or
          other relatives, the death of a loved one can feel overwhelming. The
          situation is burdensome when there are not enough resources to cover
          the cost of the funeral. There are cases where families donated
          remains of their loved ones for experiment because they could not
          afford the minimum costs of graves or cremations that give their loved
          ones befitting funerals. During those periods of anguish, the level of
          support you have around you, your personality and your own health and
          well-being can all play a role in how the grief impacts you.
        </p>

        <p>
          While reaching out to those who care about you is an important part of
          healing, Sababu Fund will be there with you. Sababu Fund comes in at
          the height of those griefs to share the responsibility with the
          community that cushions the burden on the surviving family.
        </p>
      </div>
    </section>
  );
}

const UpcomingEvents = ({
  onSuccess,
  showSuccessMessage,
  setShowSuccessMessage,
  events,
}) => {
  return (
    <div id="events" className={styles.eventContainer}>
      <div className={`${styles.upcomingEvents}`}>
        <section className={`${"section sectionLayout"} `}>
          <p className={`${"intro"} ${styles.eventIntro}`}>Events</p>
          <div className={`${styles.event}`}>
            <div className={styles.heading}>
              <h1 className={"headingPrimary"}>
                Participate in Our Collaborative Community Activities and Enjoy
                Meaningful Engagements.
              </h1>
              <p>
                Twice a year, we host general meetings with members to review
                and enhance programs, inviting your insights to shape our
                organization's future.
              </p>
            </div>
          </div>
          {showSuccessMessage && (
            <Alert
              className={styles.alert}
              variant="success"
              dismissible
              onClick={() => setShowSuccessMessage(false)}
            >
              Sign up successful! Check your email for confirmation.
            </Alert>
          )}
          <div className={styles.eventImgContainer}>
            <Events
              events={events}
              onSuccess={onSuccess}
              showSuccessMessage={showSuccessMessage}
            />
            <EventImage />
          </div>
        </section>
      </div>
    </div>
  );
};

function BlogPosts() {
  return (
    <div id="blogs">
      <Blogs />
    </div>
  );
}

function EventImage() {
  return (
    <div className={styles.meetingImage}>
      <img
        src="/images/sb-agm-members1-2023.jpg"
        alt="Members at the 2023 AGM"
      />
    </div>
  );
}

export default Home;

//
const titleCase = (str) => {
  if (!str) return ""; // Add a check to return an empty string if str is null or undefined
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//Capitalize letters
const upperCase = (str) => {
  if (!str) return ""; // Add a check to return an empty string if str is null or undefined
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Split words and
function splitDate(dateString) {
  const dateObject = new Date(dateString + "T12:00:00Z"); // Set time to noon (12:00 PM) in UTC
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const [weekday, month, day, year] = formattedDate.split(" ");
  return { year: parseInt(year), month, day: parseInt(day), weekday };
}

//Earliest event
function getEarliestEvent(events) {
  if (events.length === 0) return null;

  const currentDate = new Date();

  // Filter out past events
  const activeEvents = events.filter(
    (event) => new Date(event.event_date) >= currentDate
  );

  if (activeEvents.length === 0) return null;

  // Find the earliest active event
  let earliestEvent = activeEvents[0];
  for (let i = 1; i < activeEvents.length; i++) {
    if (
      new Date(activeEvents[i].event_date) < new Date(earliestEvent.event_date)
    ) {
      earliestEvent = activeEvents[i];
    }
  }

  return earliestEvent;
}

//
function formatTo12HourTime(timeString) {
  // Ensure the input timeString is a valid string
  if (!timeString || typeof timeString !== "string") {
    return ""; // or return a default value or throw an error based on your requirement
  }

  // Split the input time string into hours and minutes
  const [hours, minutes] = timeString.split(":");

  // Check if the split was successful and hours and minutes are valid
  if (hours === undefined || minutes === undefined) {
    return ""; // or handle the error appropriately
  }

  // Convert hours to an integer
  let hour = parseInt(hours, 10);

  // Determine the AM/PM suffix
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert hour from 24-hour to 12-hour format
  hour = hour % 12 || 12; // `hour % 12` will convert 13 to 1, 14 to 2, ..., 0 will be converted to 12

  // Return the formatted time string
  return `${hour}:${minutes.padStart(2, "0")} ${ampm}`;
}
