import React from "react";
import "./FutureWeatherList.css";

export default function FutureWeatherList(prop) {
  if (prop.weather !== null && prop.weather.length > 1) {
    const list = [];
    for (let i = 0; i < 7; i++) {
      list.push(
        <div key={i} className="col" data-id={i}>
          <ul className="Future-forecast" data-id={i}>
            <li className="Day-of-the-week" data-id={i}>
              {prop.weather[i].date.day.slice(0, 3)}
            </li>
            <li data-id={i}>
              <img
                src={prop.weather[i].icon}
                alt=""
                height="70"
                width="70"
                className="Forecast-icon"
                data-id={i}
              />
            </li>
            <li className="Day-temperature" data-id={i}>
              {prop.weather[i].max}&#186;
            </li>
            <li className="Night-temperature" data-id={i}>
              {prop.weather[i].min}&#186;
            </li>
          </ul>
        </div>
      );
    }
    return <div className="row">{list}</div>;
  }
}
