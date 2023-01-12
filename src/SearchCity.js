import React, { useState } from "react";
import axios from "axios";
import WeatherForDay from "./WeatherForDay";
import FutureWeatherList from "./FutureWeatherList";

export default function SearchCity(prop) {
  let key = "7tddcc04c39d0b7bffb9bca4oab00bfa";

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
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
    // axios.get(url).then(searchCityByCoordinats);
    axios.get(url).then(handleResponse);
  }

  // function searchCityByCoordinats(response) {
  //   let lat = response.data[0].lat;
  //   let lon = response.data[0].lon;
  //   const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=20&appid=${key}&units=metric`;
  //   axios.get(url).then(handleResponse);
  // }

  function handleResponse(response) {
    console.log(response);
    setLoaded("true");
    let weatherDaily = [];
    let city = response.data.city;
    response.data.daily.map((day) =>
      weatherDaily.push({
        city: `${city}`,
        description: day.condition.description,
        temp: Math.round(day.temperature.day),
        max: Math.round(day.temperature.maximum),
        min: Math.round(day.temperature.minimum),
        humidity: Math.round(day.temperature.humidity),
        wind: Math.round(day.wind.speed),
        icon: day.condition.icon_url,
        date: convertDate(day.time),
      })
    );
    setWeather(weatherDaily);
  }

  function convertDate(data) {
    let date = new Date(data * 1000);
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
    return {
      day: day,
      month: month,
      date: dayNumber,
      full: `${month} ${dayNumber}, ${day}`,
    };
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
