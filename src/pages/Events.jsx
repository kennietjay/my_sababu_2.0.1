import React, { useState } from "react";
import styles from "./Events.module.css"; // Assuming you have a CSS module
import {
  splitDate,
  formatTo12HourTime,
  titleCase,
  upperCase,
} from "../../utils/utils";
import EventSignup from "../components/EventSignup";
// import Button from "../components/Button";
import { Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
                        {/* <Button
                          onClick={() => handleOpenModal(post.id)}
                          type="primary"
                        >
                          Sign up
                        </Button> */}

                        <HashLink to="/contacts#top" className="ctaLink">
                          Sign up
                        </HashLink>
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
