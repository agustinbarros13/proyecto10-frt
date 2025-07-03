import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/auth/register", "POST", form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      if (err.message.includes("duplicate") || err.message.includes("email")) {
        setError("Ya existe un usuario con ese correo.");
      } else {
        setError(err.message || "Error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <ErrorMessage message={error} />
    </div>
  );
}

export default Register;
