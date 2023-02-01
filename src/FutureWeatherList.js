import React from "react";

export default function FutureWeatherList(prop) {
  if (prop.weather !== null && prop.weather.length > 1) {
    const list = [];

    for (let i = 0; i < 6; i++) {
      let hover = "mt-4 p-2 list-group-item list-group-item-action text-center";
      if (i === 0) {
        hover =
          "mt-4 p-2 list-group-item list-group-item-action text-center list-group-item-secondary";
      }
      list.push(
        <a
          key={i}
          className="col list-group rounded"
          href="#main"
          style={{ textDecoration: "none" }}>
          <ul
            className={hover}
            style={{ listStyle: "none" }}
            id={i}
            data-id={i}>
            <li className="text-uppercase fw-bold">
              {prop.weather[i].date.day.slice(0, 3)}
            </li>
            <li data-id={i}>
              <img src={prop.weather[i].icon} alt="" height="50" width="50" />
            </li>
            <li data-id={i}>
              <div className="text-secondary">{prop.weather[i].min}&#186;</div>{" "}
              <div> {prop.weather[i].max}&#186;</div>
            </li>
          </ul>
        </a>
      );
    }
    return <div className="row">{list}</div>;
  }
}
