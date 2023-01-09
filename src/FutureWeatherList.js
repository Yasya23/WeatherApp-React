import React from "react";
import "./FutureWeatherList.css";

export default function FutureWeatherList(prop) {
  console.log(prop.weather.length);
  if (prop.weather !== null && prop.weather.length>1) {
    // console.log(prop);
    const list = [];
    console.log(list);
    for (let i = 1; i < 5; i++) {
      list.push(
        <div key={i} className="col">
          <ul className="Future-forecast">
            <li className="Day-of-the-week"></li>
            <li>
              <img
                src={prop.weather[i].icon}
                alt=""
                height="70"
                width="70"
                className="Forecast-icon"
              />
            </li>
            <li className="Day-temperature">{prop.weather[i].max}</li>
            <li className="Night-temperature">{prop.weather[i].min}</li>
          </ul>
        </div>
      );
    }
    return <div className="row">{list}</div>;
  }
}
