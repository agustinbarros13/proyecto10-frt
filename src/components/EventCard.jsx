import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      {event.poster && (
        <img
          src={event.poster}
          alt="Cartel del evento"
          className="event-card-image"
        />
      )}

      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p className="event-description">{event.description}</p>
        <p className="event-date">
          📅 {new Date(event.date).toLocaleString()}
        </p>
        <p className="event-location">📍 {event.location}</p>

        <Link to={`/event/${event._id}`} className="event-card-link">
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
