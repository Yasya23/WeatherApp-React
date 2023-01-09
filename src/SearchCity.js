import React, { useState } from "react";
import axios from "axios";
import WeatherForDay from "./WeatherForDay";
import FutureWeatherList from "./FutureWeatherList";

export default function SearchCity() {
  let key = "02fcb025d3addcd1b48a81a78b212aae";
  let weatherDefault=[{
    city:"",
    description:"",
    temp:0,
    icon:"http://openweathermap.org/img/wn/10d@2x.png",
    humidity:0,
    wind:0
  }]
  let [weather, setWeather] = useState(weatherDefault);
  let [city, setCity] = useState("");

  function cityName(event) {
    event.preventDefault();
    setCity(event.target.value); 
  }

  function submitCity(event) {
    event.preventDefault();
    callApi();
  }

  function callApi(){
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
    axios.get(url).then(searchCityByCoordinats);
  }

  function searchCityByCoordinats(response) {
    console.log(response);
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${key}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handleResponse(response) {
    console.log(response);
    let weatherDaily = [];
    let city=response.data.city.name;
    response.data.list.map((day) =>
      weatherDaily.push({
        city:`${city}`,
        description: day.weather[0].description,
        temp: Math.round(day.main.temp),
        max: Math.round(day.main.temp_max),
        min: Math.round(day.main.temp_min),
        humidity: Math.round(day.main.humidity),
        wind: Math.round(day.wind.speed),
        icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
      })
    );
    setWeather(weatherDaily);
  }

  return (
    <div>
      <div className="row">
        <div className="col col-sm-12 mb-3">
          <form className="input-group" onSubmit={submitCity}>
            <input
              type="search"
              autoComplete="off"
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
      <WeatherForDay weather={weather} />
      <FutureWeatherList weather={weather} />
    </div>
  );
}
