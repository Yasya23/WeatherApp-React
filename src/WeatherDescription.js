import React from "react";

export default function WeatherDescription(prop) {
  return (
    <div className="row">
      <div className="col">
        <h1 className="fs-2 fw-bold">{prop.city}</h1>
        <h2 id="main" className="text-capitalize text-secondary">
          {prop.description}
        </h2>
        <p>{prop.date}</p>
      </div>
    </div>
  );
}
