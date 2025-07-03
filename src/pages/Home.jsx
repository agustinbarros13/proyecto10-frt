// src/pages/Home.jsx
import "./Home.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setQuery(q);
    fetchEvents(q);
  }, [location.search]);

  const fetchEvents = async (search = "") => {
    setLoading(true);
    setError("");

    try {
      const data = search
        ? await apiFetch(`/events/search?q=${search}`)
        : await apiFetch("/events/all");
      setEvents(data);
    } catch (err) {
      setError("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="home-container">
      <h1>Eventos disponibles</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar por título, lugar o descripción"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && query && (
        <p className="results-info">
          Resultados para: <strong>{query}</strong>
        </p>
      )}

      {!loading && !error && events.length === 0 && (
        <div>
          <p>No se encontraron eventos con esa búsqueda.</p>
          <button onClick={() => navigate("/")}>Volver al listado</button>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="event-list">
          {query && (
            <p className="results-info">
              Se encontraron {events.length} evento(s)
            </p>
          )}
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
