import React, { useState } from "react";
import axios from "axios";
import MainIcon from "./MainIcon";
import MainTemp from "./MainTemp";
import WeatherValues from "./WeatherValues";

export default function Weather(prop) {
  let [weather, setWeather] = useState({});
  function handleResponse(response) {
    setWeather({
      description: response.data.weather[0].description,
      temp: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  if (prop.city !== "") {
    let key = "02fcb025d3addcd1b48a81a78b212aae";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${prop.city}&appid=${key}&units=metric`;
    axios.get(url).then(handleResponse);
    return (
      <div>
        <div className="row">
          <div className="col">
            <h1 classNAme="city-name">{prop.city}</h1>
            <h2> {weather.description}</h2>
          </div>
        </div>
        <div className="row align-items-center">
          <MainIcon icon={weather.icon} />
          <MainTemp temp={weather.temp} />
          <WeatherValues wind={weather.wind} humidity={weather.humidity} />
        </div>
      </div>
    );
  }
}
