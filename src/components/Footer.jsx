import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 - Gestión de Eventos. Todos los derechos reservados.</p>
        <div className="social-icons">
          <span title="Facebook">📘</span>
          <span title="Instagram">📸</span>
          <span title="Twitter">🐦</span>
          <span title="LinkedIn">💼</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
