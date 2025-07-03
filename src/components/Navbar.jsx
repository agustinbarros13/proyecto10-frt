import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          Eventos
        </Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <ul
          className={`navbar-menu ${isOpen ? "open" : ""}`}
          ref={menuRef}
        >
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsOpen(false)}>Registro</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/create" onClick={() => setIsOpen(false)}>Crear Evento</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
