import "./WeatherForDay.css";

export default function WeatherForDay(prop) {
  console.log(prop);
  return (
    <div>
      <div className="row">
        <div className="col">
          <h1 className="City-name">{prop.weather[0].city}</h1>
          <h2>{prop.weather[0].description}</h2>
          <p>{prop.weather[0].date.full}</p>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-sm-4 Icon-main">
          <img src={prop.weather[0].icon} alt="" />
        </div>

        <div className="col-sm-4">
          <div className="Temp">
            <div className="Temp-value">{prop.weather[0].temp}</div>
            <div className="Temp-units">
              <a href="/" className="active" id="celcius">
                &#186;C
              </a>
              <a href="/"> &#186;F</a>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <ul className="Weather-values">
            <li>
              Humidity: {prop.weather[0].humidity} <span>%</span>
            </li>
            <li>
              Wind: {prop.weather[0].wind} <span>km/h</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
