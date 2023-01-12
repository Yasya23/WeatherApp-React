import React, { useState } from "react";
import axios from "axios";
import WeatherForDay from "./WeatherForDay";
import FutureWeatherList from "./FutureWeatherList";

export default function SearchCity(prop) {
  let key = "02fcb025d3addcd1b48a81a78b212aae";

  let [weather, setWeather] = useState("");
  let [loaded, setLoaded] = useState("false");
  let [city, setCity] = useState(prop.defaultCity);

  function cityName(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function submitCity(event) {
    event.preventDefault();
    callApi();
  }

  function callApi() {
    console.log(1);
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
    axios.get(url).then(searchCityByCoordinats);
  }

  function searchCityByCoordinats(response) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=20&appid=${key}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handleResponse(response) {
    console.log(response);
    setLoaded("true");
    let weatherDaily = [];
    let city = response.data.city.name;
    response.data.list.map((day) =>
      weatherDaily.push({
        city: `${city}`,
        description: day.weather[0].description,
        temp: Math.round(day.main.temp),
        max: Math.round(day.main.temp_max),
        min: Math.round(day.main.temp_min),
        feelsLike: Math.round(day.main.feels_like),
        humidity: Math.round(day.main.humidity),
        wind: Math.round(day.wind.speed),
        icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
        date: convertDate(day.dt),
      })
    );
    setWeather(weatherDaily);
  }

  function convertDate(data) {
    let date = new Date(data * 1000);
    console.log(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December ",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    let dayNumber = date.getDate();
    if (dayNumber < 10) dayNumber = `0${dayNumber}`;
    return { day: day, month: month, date: dayNumber };
  }

  if (loaded === "true") {
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
  } else {
    callApi();
    return <p>Loaded...</p>;
  }
}
