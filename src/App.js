import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App(prop) {
  let [temp, setTemp] = useState("");
  function handleResponse(response) {
    setTemp(`It's ${response.data.main.temp}`);
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${prop.city}&appid=f28953e2adf95c39204b733667598ea9&units=metric`;
  axios.get(url).then(handleResponse);

  return (
    <div className="App">
      <header className="App-header">
        <p>{temp}</p>
      </header>
    </div>
  );
}

export default App;
