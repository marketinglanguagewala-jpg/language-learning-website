import React from "react";

export default function Map() {
  return (
    <div className="map-wrap">
      <div
        id="map"
        className="row-height"
        data-map-zoom={15}
        data-map-scroll="true"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10784.134247028573!2d77.36225822894056!3d28.612223058076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5bab02dc48b%3A0x11802e565766471!2sLinguapol%20-%20Learn%20Portuguese%2C%20Japanese!5e1!3m2!1sen!2sin!4v1769710708733!5m2!1sen!2sin"
          width="100%"
          height={646}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
