import React, { useState, useEffect, useCallback, memo } from 'react';

import Location from './Location';
import createDailyWeatherData from '../helpers/createDailyWeatherData';
import ActiveDay from './ActiveDay';

import axios from 'axios';
import FutureWeatherItem from './FutureWeatherItem';
import MainIcon from './MainIcon';
import WeatherDescription from './WeatherDescription';
import WeatherValues from './WeatherValues';
import { ThreeDots } from 'react-loader-spinner';

function App() {
  const key = '7tddcc04c39d0b7bffb9bca4oab00bfa';
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [data, setData] = useState(null);
  const [getByCoordinates, setGetByCoordinates] = useState(false);

  useEffect(() => {
    if (data?.city) setCity(data.city);
    if (data?.daily) setWeather(createDailyWeatherData(data.daily, city));
    setLoaded(true);
  }, [data]);

  useEffect(() => {
    if (city) {
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=${units}`;
      axios
        .get(url)
        .then(({ data }) => {
          setData(data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [units, city]);

  useEffect(() => {
    getByCoordinates &&
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        if (lat && lon) {
          const url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${key}`;
          axios
            .get(url)
            .then(({ data }) => {
              setData(data);
              setLoaded(true);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
      });
    setGetByCoordinates(false);
  }, [getByCoordinates]);

  useEffect(() => {
    if (!city) setGetByCoordinates(true);
  }, [city]);

  return loaded && weather ? (
    <div className="container">
      <div className="mx-auto px-2 py-4" style={{ maxWidth: '600px' }}>
        <div>
          <div className="row">
            <div className="col col-sm-12 mb-3">
              <Location
                getCity={(value) => {
                  setCity(value);
                }}
                currentLocation={() => {
                  setGetByCoordinates(true);
                }}
              />
            </div>
          </div>

          <div>
            <WeatherDescription
              city={city}
              description={weather[activeDay]?.description}
              date={weather[activeDay]?.date.full}
            />
            <div className="row align-items-center">
              <MainIcon
                src={weather[activeDay]?.icon}
                alt={weather[activeDay].iconAlt}
              />

              <div className="col-sm-4">
                {weather && (
                  <ActiveDay
                    weather={weather}
                    activeDay={activeDay}
                    changeUnits={(unit) => setUnits(unit)}
                    unit={units}
                  />
                )}
              </div>

              <WeatherValues
                wind={weather[activeDay].wind}
                windSpeed={units === 'imperial' ? 'm/h' : 'km/h'}
                humidity={weather[activeDay].humidity}
                minTemp={weather[activeDay].min}
                maxTemp={weather[activeDay].max}
              />
            </div>
            <div>
              <div className="row">
                {weather.map((el, index) => (
                  <FutureWeatherItem
                    key={index}
                    data={el}
                    active={index === activeDay}
                    onClick={() => {
                      setActiveDay(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 text-center">
        <a
          href="https://github.com/Yasya23/WeatherApp-React"
          target="_blank"
          rel="noreferrer">
          Open source code
        </a>{' '}
        by Yana Zahoruiko
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#00b4d8"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
}

export default memo(App);
