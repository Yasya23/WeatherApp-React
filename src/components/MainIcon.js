import React from 'react';

export default function MainIcon(prop) {
  return (
    <div className="col-sm-4 text-center">
      <img src={prop.src} alt={prop.alt} />
    </div>
  );
}
