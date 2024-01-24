import React from 'react';
import { Link } from 'react-router-dom';

export default function FutureWeatherItem({ data, active, onClick }) {
  return (
    <Link
      to="/"
      className="col list-group rounded btn-link"
      style={{ textDecoration: 'none' }}
      onClick={onClick}>
      <ul
        className={`mt-4 p-2 list-group-item list-group-item-action text-center ${
          active ? 'list-group-item-secondary' : ''
        }`}
        style={{ listStyle: 'none' }}>
        <li className="text-uppercase fw-bold">{data.date.day.slice(0, 3)}</li>
        <li>
          <img src={data.icon} alt="" height="50" width="50" />
        </li>
        <li>
          <div className="text-secondary">{data.min}&#186;</div>{' '}
          <div> {data.max}&#186;</div>
        </li>
      </ul>
    </Link>
  );
}
