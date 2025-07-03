import "./CreateEvent.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);
      formData.append("location", form.location);
      if (poster) formData.append("poster", poster);

      await apiFetch("/events/create", "POST", formData, token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Error al crear evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="datetime-local"
          name="date"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Evento"}
        </button>
      </form>

      {loading && <Loading text="Creando evento..." />}
      <ErrorMessage message={error} />
    </div>
  );
}

export default CreateEvent;
