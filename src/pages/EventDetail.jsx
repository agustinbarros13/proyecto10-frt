// src/pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./EventDetail.css";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await apiFetch(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError("Evento no encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleAttend = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Debes iniciar sesión para asistir");
      return;
    }

    try {
      setAttending(true);
      const res = await apiFetch(`/events/${id}/attend`, "POST", null, token);
      setMessage(res.message || "Asistencia confirmada");
      const updated = await apiFetch(`/events/${id}`);
      setEvent(updated);
    } catch (err) {
      setMessage(err.message || "Error al asistir al evento");
    } finally {
      setAttending(false);
    }
  };

  if (loading) return <Loading text="Cargando evento..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="event-detail-container">
      <h2 className="event-title">{event.title}</h2>

      <div className="event-main">
        {event.poster && (
          <img
            src={event.poster}
            alt="Cartel del evento"
            className="event-poster"
          />
        )}

        <div className="event-info">
          <p><strong>📅 Fecha:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>📍 Ubicación:</strong> {event.location}</p>
          <p><strong>📝 Descripción:</strong> {event.description}</p>

          <button onClick={handleAttend} disabled={attending}>
            {attending ? "Enviando..." : "Asistir"}
          </button>

          {message && <p className="event-message">{message}</p>}
        </div>
      </div>

      <div className="event-attendees">
        <h3>Asistentes</h3>
        {event.attendees && event.attendees.length > 0 ? (
          <ul>
            {event.attendees.map((user) => (
              <li key={user._id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>Aún no hay asistentes</p>
        )}
      </div>

      <Link to="/" className="back-link">← Volver al inicio</Link>
    </div>
  );
}

export default EventDetail;
