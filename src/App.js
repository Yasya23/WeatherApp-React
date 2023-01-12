import React from "react";

import "./App.css";
import SearchCity from "./SearchCity";

function App() {
  return (
    <div className="container">
      <div className="Main">
        <SearchCity defaultCity="Lviv" />
      </div>
      <div className="Github-link">
        <a
          href="https://github.com/Yasya23/WeatherApp-React"
          target="_blank"
          rel="noreferrer">
          Open source code
        </a>{" "}
        by Yana Zahoruiko
      </div>
    </div>
  );
}

export default App;
