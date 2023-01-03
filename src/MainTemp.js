import React from "react";

export default function MainTemp(temp) {
  return (
    <div className="col-sm-4">
      <div className="temp">
        <div className="temp-value">{temp.temp}</div>
        <div className="temp-units">
          <a href="/" className="active" id="celcius">
            &#186;C
          </a>
          <a href="/">&#186;F</a>
        </div>
      </div>
    </div>
  );
}
