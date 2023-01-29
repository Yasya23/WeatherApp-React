import React from "react";

import Weather from "./Weather";

function App() {
  return (
    <div className="container">
      <div className="mx-auto px-2 py-4" style={{ maxWidth: "600px" }}>
        <Weather defaultCity="Lviv" />
      </div>
      <div className="py-2 text-center">
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
