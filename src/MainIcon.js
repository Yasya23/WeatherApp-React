import React from "react";

export default function MainIcon(icon) {
  return (
    <div className="col-sm-4 icon-main">
      <img src={icon.icon} alt="" />
    </div>
  );
}
