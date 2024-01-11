import React, { memo } from 'react';

const WeatherDescription = (prop) => {
  return (
    <div className="row">
      <div className="col">
        <h1 className="fs-2 fw-bold">{prop.city}</h1>
        <h2 id="main" className="text-capitalize text-secondary">
          {prop.description}
        </h2>
        <p>{prop.date}</p>
      </div>
    </div>
  );
};

export default memo(WeatherDescription);
