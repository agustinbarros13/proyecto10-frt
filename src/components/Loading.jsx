import React from "react";
import "./Loading.css";

function Loading({ text = "Cargando eventos..." }) {
  return <p className="loading-message">{text}</p>;
}

export default Loading;
