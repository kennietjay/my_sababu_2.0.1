import React from "react";

const MapComponent = () => {
  return (
    <div className="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.4882122045135!2d-77.4240677!3d38.960091599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b63f8f25407c75%3A0x999ebf9a43af0b90!2s42344%20Winsbury%20West%20Pl%2C%20Sterling%2C%20VA%2020171!5e0!3m2!1sen!2sus!4v1676582111395!5m2!1sen!2sus"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Sababu Location"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
