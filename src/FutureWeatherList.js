import "./FutureWeatherList.css";

export default function FutureWeatherList(prop) {
  if (prop.weather !== null) {
    const list = [];
    console.log(list);
    for (let i = 1; i < 5; i++) {
      list.push(
        <div key={i} className="col">
          <ul className="future-forecast">
            <li className="day-of-the-week"></li>
            <li>
              <img
                src={prop.weather[i].icon}
                alt=""
                height="50"
                width="50"
                className="forecast-icon"
              />
            </li>
            <li className="day-temperature">{prop.weather[i].temp}</li>
            <li className="night-temperature">{prop.weather[i].temp}</li>
          </ul>
        </div>
      );
    }
    return <div className="row">{list}</div>;
  }
}
