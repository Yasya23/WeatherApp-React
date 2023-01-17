import React, { useState } from "react";
import axios from "axios";
// import WeatherForDay from "./WeatherForDay";
import FutureWeatherList from "./FutureWeatherList";
import MainIcon from "./MainIcon";
import WeatherDescription from "./WeatherDescription";
import "./Weather.css";
import WeatherValues from "./WeatherValues";

export default function Weather(prop) {
  let key = "7tddcc04c39d0b7bffb9bca4oab00bfa";

  let [weather, setWeather] = useState("");
  let [loaded, setLoaded] = useState("false");
  let [city, setCity] = useState(prop.defaultCity);
  let [windSpeed, setWindSpeed] = useState("km/h");
  function cityName(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function convertToFahrenheit(event) {
    event.preventDefault();
    console.log(1);
    document.querySelector(".Fahrenheit").classList.add("Active");
    document.querySelector(".Celcius").classList.remove("Active");
    setWindSpeed("m/h");
    changeUnit("imperial");
  }

  function convertToCelcius(event) {
    event.preventDefault();
    document.querySelector(".Celcius").classList.add("Active");
    document.querySelector(".Fahrenheit").classList.remove("Active");
    changeUnit("metric");
    setWindSpeed("km/h");
  }
  function changeUnit(unit) {
    callApi(unit);
  }

  function submitCity(event) {
    event.preventDefault();
    callApi("metric");
  }

  function callApi(units) {
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=${units}`;
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
        iconAlt: day.condition.icon,
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
        <div>
          <WeatherDescription
            city={weather[0].city}
            description={weather[0].description}
            date={weather[0].date.full}
          />
          <div className="row align-items-center">
            <MainIcon src={weather[0].icon} alt={weather[0].iconAlt} />

            <div className="col-sm-4">
              <div className="Temp">
                <div className="Temp-value">{weather[0].temp}</div>
                <div className="Temp-units">
                  <a
                    href="/"
                    className="Celcius Active"
                    onClick={convertToCelcius}>
                    &#186;C
                  </a>
                  <a
                    href="/"
                    className="Fahrenheit"
                    onClick={convertToFahrenheit}>
                    &#186;F
                  </a>
                </div>
              </div>
            </div>

            <WeatherValues
              wind={weather[0].wind}
              windSpeed={windSpeed}
              humidity={weather[0].humidity}
            />
          </div>
        </div>
        <FutureWeatherList weather={weather} />
      </div>
    );
  } else {
    callApi("metric");
    return <p>Loaded...</p>;
  }
}
