import React, { useState } from "react";

import "./App.css";
import Weather from "./Weather";

function App() {
  const [city, setCity] = useState("");
  let cityInput;

  function submitCity(event) {
    event.preventDefault();
    setCity(cityInput);
  }

  function cityName(event) {
    event.preventDefault();
    cityInput = event.target.value;
  }

  return (
    <div className="container">
      <div className="Main">
        <div className="row">
          <div className="col col-sm-12">
            <form className="input-group" onSubmit={submitCity}>
              <input
                type="search"
                autocomplete="off"
                className="form-control input-city"
                placeholder="Enter a city"
                onChange={cityName}
              />
              <button
                className="btn btn-outline-primary input-city"
                type="submit">
                Search
              </button>
              <button
                className="btn btn-outline-primary input-city"
                type="button">
                Current
              </button>
            </form>
          </div>
        </div>
        <Weather city={city} />
      </div>
      <div class="Github-link">
        <a
          href="https://github.com/Yasya23/WeatherApp-React"
          target="_blank"
          rel="noreferrer">
          Open source code
        </a>{" "}
        by Yana Zahoruiko
      </div>
    </div>
  );
}

export default App;
