import React from "react";
import "./MainIcon.css";

export default function MainIcon(prop) {
  return (
    <div className="col-sm-4 Icon-main">
      <img src={prop.src} alt={prop.alt} />
    </div>
  );
}
