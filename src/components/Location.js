import React, { useState } from 'react';

export default function Location({ getCity, currentLocation }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getCity(city);
  };

  const handlLocation = (e) => {
    e.preventDefault();
    currentLocation();
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="search"
        autoComplete="off"
        className="form-control input-city p-2"
        placeholder="Enter a city"
        onChange={(e) => {
          setCity(e.target.value);
        }}
        value={city}
      />
      <button className="btn btn-outline-primary input-city" type="submit">
        Search
      </button>
      <button
        className="btn btn-outline-primary input-city"
        type="button"
        onClick={handlLocation}>
        Current
      </button>
    </form>
  );
}
