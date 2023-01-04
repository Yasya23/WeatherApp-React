import React from "react";
import axios from "axios";

export default function Weather(prop) {
  let key = "02fcb025d3addcd1b48a81a78b212aae";
  let weather = [];

  function handleResponse(response) {
    console.log(response);
    // response.data.list.map((day) =>
    //   weather.push({
    //     description: day.weather.description,
    //     temp: Math.round(day.main.temp),
    //     humidity: Math.round(day.main.humidity),
    //     wind: Math.round(day.wind.speed),
    //     icon: `http://openweathermap.org/img/wn/${day.weather.icon}@2x.png`,
    //   })
    // );
  }

  function searchCityByCoordinats(response) {
    console.log(response);
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    const url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
    axios.get(url).then(handleResponse);
  }

  if (prop.city !== "") {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${prop.city}&limit=1&appid=${key}`;
    axios.get(url).then(searchCityByCoordinats);
    if (weather.length !== 0) {
      return (
        <div>
          <div className="row">
            <div className="col">
              <h1 classNAme="city-name">{prop.city}</h1>
              <h2> {weather[0].description}</h2>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-sm-4 icon-main">
              <img src={weather[0].icon} alt="" />
            </div>
            <div className="col-sm-4">
              <div className="temp">
                <div className="temp-value">{weather[0].temp}</div>
                <div className="temp-units">
                  <a href="/" className="active" id="celcius">
                    &#186;C
                  </a>
                  <a href="/">&#186;F</a>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <ul class="Weather-values">
                <li>Humidity:{weather[0].humidity}</li>
                <li>Wind:{weather[0].wind}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}
