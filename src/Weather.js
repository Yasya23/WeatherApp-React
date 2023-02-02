import React, { useState, useEffect } from "react";
import axios from "axios";
import FutureWeatherList from "./FutureWeatherList";
import MainIcon from "./MainIcon";
import WeatherDescription from "./WeatherDescription";
import WeatherValues from "./WeatherValues";
import { ThreeDots } from "react-loader-spinner";

export default function Weather(prop) {
  const key = "7tddcc04c39d0b7bffb9bca4oab00bfa";
  const fahrenheit = document.querySelector(".fahrenheit");
  const celcius = document.querySelector(".celcius");
  const [weather, setWeather] = useState("");
  const [loaded, setLoaded] = useState("false");
  const [city, setCity] = useState(prop.defaultCity);
  const [windSpeed, setWindSpeed] = useState("km/h");
  const [units, setUnits] = useState("metric");
  const [main, setMain] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [pointerEventsUnits, setPoinerEventsUnits] = useState({
    fahrenheit: true,
    celcius: "none",
  });

  useEffect(() => {
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  function callApi() {
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=${units}`;
    axios.get(url).then(handleResponse);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      if (lat !== "" || lon !== "") {
        searchByCoordinats(lat, lon);
        replaceActiveUnitColor(fahrenheit, celcius);
        disableUnitIfActive(true, "none");
        setUnits("metric");
      }
    });
  }

  function searchByCoordinats(lat, lon) {
    const url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${key}`;
    axios.get(url).then(handleResponse);
  }

  function handleResponse(response) {
    setLoaded("true");
    setCity(response.data.city);
    const cityName = response.data.city;
    const weatherDaily = [];
    response.data.daily.forEach((day) =>
      weatherDaily.push({
        city: `${cityName}`,
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

  function cityName(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function submitCity(event) {
    event.preventDefault();
    callApi();
    event.target.reset();
  }

  function replaceMainDayWeather(event) {
    event.preventDefault();
    const day = event.target.parentNode.dataset.id;
    if (day !== undefined) {
      if (activeDay !== day) {
        document
          .getElementById(activeDay)
          .classList.remove("list-group-item-secondary");
        document.getElementById(day).classList.add("list-group-item-secondary");
        setActiveDay(day);
      }
      setMain(day);
    }
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

  function convertToFahrenheit(event) {
    event.preventDefault();
    replaceActiveUnitColor(celcius, fahrenheit);
    disableUnitIfActive("none", true);
    setWindSpeed("m/h");
    setUnits("imperial");
  }

  function convertToCelcius(event) {
    event.preventDefault();
    replaceActiveUnitColor(fahrenheit, celcius);
    disableUnitIfActive(true, "none");
    setWindSpeed("km/h");
    setUnits("metric");
  }

  function disableUnitIfActive(fahrenheit, celcius) {
    setPoinerEventsUnits({
      fahrenheit: fahrenheit,
      celcius: celcius,
    });
  }

  function replaceActiveUnitColor(unitAdd, unitRemove) {
    const colorClass = "text-secondary";
    unitAdd.classList.add(colorClass);
    unitRemove.classList.remove(colorClass);
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
                className="form-control input-city p-2"
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
                type="button"
                onClick={getCurrentLocation}>
                Current
              </button>
            </form>
          </div>
        </div>
        <div>
          <WeatherDescription
            city={weather[main].city}
            description={weather[main].description}
            date={weather[main].date.full}
          />
          <div className="row align-items-center">
            <MainIcon src={weather[main].icon} alt={weather[main].iconAlt} />

            <div className="col-sm-4">
              <div className="text-center">
                <div
                  className="me-1 position-relative"
                  style={{ fontSize: "90px" }}>
                  {weather[main].temp}
                  <div className="fs-5 d-inline-block position-absolute mt-4">
                    <a
                      href="/"
                      className="celcius me-1 text-decoration-none"
                      style={{ pointerEvents: pointerEventsUnits.celcius }}
                      onClick={convertToCelcius}>
                      &#186;C
                    </a>
                    <a
                      href="/"
                      className="fahrenheit text-decoration-none text-secondary"
                      style={{ pointerEvents: pointerEventsUnits.fahrenheit }}
                      onClick={convertToFahrenheit}>
                      &#186;F
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <WeatherValues
              wind={weather[main].wind}
              windSpeed={windSpeed}
              humidity={weather[main].humidity}
              minTemp={weather[main].min}
              maxTemp={weather[main].max}
            />
          </div>
        </div>
        <div onClick={replaceMainDayWeather}>
          <FutureWeatherList weather={weather} />
        </div>
      </div>
    );
  } else {
    callApi();
    return (
      <div className="d-flex justify-content-center">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#00b4d8"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }
}
