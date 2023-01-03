import React from "react";

export default function WeatherValues(prop) {
  return (
    <div class="col-sm-4">
      <ul class="Weather-values">
        <li>Humidity:{prop.humidity}</li>
        <li>Wind:{prop.wind}</li>
      </ul>
    </div>
  );
}
