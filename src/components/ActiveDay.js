import React, { useState, useMemo, useEffect, useCallback } from 'react';

export default function ActiveDay({ weather, activeDay, changeUnits, unit }) {
  const [units, setUnits] = useState(unit);

  useEffect(() => {
    changeUnits(units);
  }, [units]);

  const handleChangeUnit = useCallback(
    (e, unit) => {
      e.preventDefault();
      setUnits(unit);
    },
    [setUnits]
  );

  const isMetric = useMemo(
    () => (units === 'metric' ? '' : 'text-secondary'),
    [units]
  );
  const isImperial = useMemo(
    () => (units === 'imperial' ? '' : 'text-secondary'),
    [units]
  );

  return (
    <div className="text-center">
      <div className="me-1 position-relative" style={{ fontSize: '90px' }}>
        {weather[activeDay]?.temp}
        <div className="fs-5 d-inline-block position-absolute mt-4">
          <a
            href="/"
            className={`me-1 text-decoration-none ${isMetric}`}
            onClick={(e) => handleChangeUnit(e, 'metric')}>
            &#186;C
          </a>
          <a
            href="/"
            className={`text-decoration-none ${isImperial}`}
            onClick={(e) => handleChangeUnit(e, 'imperial')}>
            &#186;F
          </a>
        </div>
      </div>
    </div>
  );
}
