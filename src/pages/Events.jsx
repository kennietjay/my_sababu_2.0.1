import React, { useState } from "react";
import styles from "./Events.module.css"; // Assuming you have a CSS module
import {
  splitDate,
  formatTo12HourTime,
  titleCase,
  upperCase,
} from "../../utils/utils";
import EventSignup from "../components/EventSignup";
import Button from "../components/Button";
import { Alert } from "react-bootstrap";

const Events = ({
  onSuccess,
  showSuccessMessage,
  setShowSuccessMessage,
  events,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    participantType: "",
    emailSubject: "Sign-up Confirmation",
    event: "Meeting",
    templateData: {
      date: "2024-07-07",
      time: "5:00 PM",
      venue: "Online on Zoom",
      meetingLink:
        "https://us06web.zoom.us/j/87029572621?pwd=YWr9RLg5jT6Mobrb0H7Hlghy9TTeK6.1",
      meetingId: "870 2957 2621",
      passcode: "038273",
    },
  });

  const currentDate = new Date();

  const sortedEvents = events
    .filter((event) => new Date(event.event_date) >= currentDate)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  const result = sortedEvents?.length > 0 ? sortedEvents : null;

  //
  const handleChange = (e) => {
    const { name, value, type, radio } = e.target;

    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenModal = (eventId) => {
    setIsOpen(true);
    setSelectedEvent(eventId);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className={` ${styles.eventContainer}`}>
      <h3 className={"headingTertiary"}>Upcoming meetings</h3>
      <div className={styles.eventListItem}>
        {result !== null ? (
          <ul>
            {sortedEvents?.map((post) => (
              <li className={styles.eventDetails} key={post.id}>
                <div className={styles.eventItem}>
                  <div className={styles.eventDate}>
                    <div className={styles.month}>
                      {splitDate(post.event_date).month}
                    </div>
                    <div className={styles.day}>
                      {splitDate(post.event_date).day}
                    </div>
                    <div className={styles.year}>
                      {splitDate(post.event_date).year}
                    </div>
                  </div>
                  <div className={styles.eventDescription}>
                    <div>
                      <div className={styles.eventTitle}>{post.title}</div>
                    </div>
                    <div className={styles.timeAndVenue}>
                      <div className={styles.dateAndTime}>
                        <span>{splitDate(post.event_date).weekday} </span>
                        <span>{splitDate(post?.event_date).month}</span>
                        <span> {splitDate(post?.event_date).day},</span>
                        <span> {splitDate(post?.event_date).year} @ </span>
                        <span>{formatTo12HourTime(post?.time)}</span>
                      </div>
                      <div className={styles.venue}>
                        {post.venue !== "TBD" &&
                        post.venue !== "" &&
                        post.venue !== titleCase("online") &&
                        post.venue ? (
                          <>
                            <span>
                              <strong>Venue</strong>: {titleCase(post?.venue)}
                            </span>
                            <span className={styles.address}>
                              {titleCase(post?.street)}, {titleCase(post?.city)}
                            </span>
                            <span>
                              {upperCase(post?.state)}. {post?.zip}.
                            </span>
                          </>
                        ) : (
                          <span>
                            <strong>Venue</strong>: {post?.venue}
                          </span>
                        )}
                      </div>
                      <div className={styles.organizer}>
                        <Button
                          onClick={() => handleOpenModal(post.id)}
                          type="primary"
                        >
                          Sign up
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i className="fa-solid fa-chevron-right"></i> Check later for
            upcoming events.
          </p>
        )}

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

        {selectedEvent && (
          <EventSignup
            closeModal={handleCloseModal}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedEvent={selectedEvent}
            onSuccess={onSuccess}
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default Events;

//
function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function filterAndSortEvents(events) {
  const currentDate = new Date();

  const sortedEvents = events
    .filter((event) => {
      const eventDate = parseDate(event.event_date);
      // Ensure the eventDate is set to midnight UTC
      eventDate.setUTCHours(0, 0, 0, 0);
      return eventDate >= currentDate;
    })
    .sort((a, b) => {
      const dateA = parseDate(a.event_date);
      dateA.setUTCHours(0, 0, 0, 0);
      const dateB = parseDate(b.event_date);
      dateB.setUTCHours(0, 0, 0, 0);
      return dateA - dateB;
    });

  return sortedEvents.length > 0 ? sortedEvents : null;
}

function processDateInput(dateInput) {
  if (Array.isArray(dateInput)) {
    return filterAndSortEvents(dateInput);
  } else if (typeof dateInput === "string") {
    const singleDate = [{ event_date: dateInput }];
    const sortedEvents = filterAndSortEvents(singleDate);
    return sortedEvents ? sortedEvents[0] : null;
  } else {
    return null;
  }
}

// Examples
// const eventsData = [
//   {
//     id: 1,
//     title: "2024 Mid Year Review",
//     description: "Meeting with members to review progress of the organization.",
//     event_date: "2024-07-07",
//     event_type_id: 1,
//     venue: "Main Hall",
//     time: "14:00",
//     street: "123 Main St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 2,
//     title: "Annual General Meeting - 2024",
//     description:
//       "Annual general meeting with all members in person. This is a reunion of all members.",
//     event_date: "2024-11-17",
//     event_type_id: 1,
//     venue: "Conference Room",
//     time: "10:00",
//     street: "456 Elm St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 3,
//     title: "Thanks Giving Dinner Sababu Members",
//     description:
//       "Member with Sababu Fund members to give thanks to God on the Thanksgiving celebrations.",
//     event_date: "2024-11-28",
//     event_type_id: 1,
//     venue: "Banquet Hall",
//     time: "18:00",
//     street: "789 Oak St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 4,
//     title: "Board of Directors Meeting",
//     description: "Quarterly meeting to discuss the progress and future plans.",
//     event_date: "2024-09-15",
//     event_type_id: 1,
//     venue: "Board Room",
//     time: "09:00",
//     street: "101 Maple St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 5,
//     title: "Community Outreach Program",
//     description: "Engagement with the community for feedback and support.",
//     event_date: "2024-08-22",
//     event_type_id: 2,
//     venue: "Community Center",
//     time: "16:00",
//     street: "202 Pine St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 6,
//     title: "Fundraising Gala",
//     description: "Annual gala to raise funds for the organization.",
//     event_date: "2024-12-01",
//     event_type_id: 3,
//     venue: "Grand Ballroom",
//     time: "19:00",
//     street: "303 Cedar St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 7,
//     title: "Volunteer Appreciation Event",
//     description: "Event to recognize and appreciate the volunteers.",
//     event_date: "2024-10-10",
//     event_type_id: 4,
//     venue: "Volunteer Hall",
//     time: "11:00",
//     street: "404 Birch St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 8,
//     title: "New Member Orientation",
//     description: "Orientation for the new members of the organization.",
//     event_date: "2024-09-25",
//     event_type_id: 1,
//     venue: "Orientation Room",
//     time: "15:00",
//     street: "505 Walnut St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 9,
//     title: "Health and Wellness Workshop",
//     description: "Workshop on health and wellness for members.",
//     event_date: "2024-10-20",
//     event_type_id: 2,
//     venue: "Health Center",
//     time: "13:00",
//     street: "606 Chestnut St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
//   {
//     id: 10,
//     title: "Leadership Training",
//     description: "Training session for future leaders within the organization.",
//     event_date: "2024-11-05",
//     event_type_id: 5,
//     venue: "Training Center",
//     time: "09:00",
//     street: "707 Elm St",
//     city: "Springfield",
//     state: "IL",
//     zip: "62701",
//   },
// ];

// console.log("Sorted events:", processDateInput(events)); // Output: Sorted events with future dates
// console.log("Single date:", processDateInput("2024-11-17")); // Output: Single date if it's in the future, else null
