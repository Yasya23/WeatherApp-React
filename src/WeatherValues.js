import React from "react";

export default function WeatherValues(prop) {
  return (
    <div className="col-sm-4">
      <ul
        className="pt-1 ps-3 text-center text-sm-start fs-6 "
        style={{ listStyle: "none" }}>
        <li>
          Humidity: {prop.humidity} <span>%</span>
        </li>
        <li>
          Wind: {prop.wind} {prop.windSpeed}
        </li>
        <li>
          Min-max: <span className="text-secondary">{prop.minTemp}&#186;</span>{" "}
          {prop.maxTemp}&#186;
        </li>
      </ul>
    </div>
  );
}
