import React from "react";
import "./WeatherValues.css";

export default function WeatherValues(prop) {
  return (
    <div className="col-sm-4">
      <ul className="Weather-values">
        <li>
          Humidity: {prop.humidity} <span>%</span>
        </li>
        <li>
          Wind: {prop.wind} <span>{prop.windSpeed}</span>
        </li>
      </ul>
    </div>
  );
}
