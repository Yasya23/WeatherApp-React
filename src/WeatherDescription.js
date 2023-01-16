import "./WeatherDescription.css";

import React from "react";
export default function WeatherDescription(prop) {
  return (
    <div className="row">
      <div className="col">
        <h1 className="City-name">{prop.city}</h1>
        <h2>{prop.description}</h2>
        <p>{prop.date}</p>
      </div>
    </div>
  );
}
