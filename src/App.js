import React, { useEffect, useState } from "react";
import "./App.css";

import { Header } from './components';

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const fetchMessage = async () => {
    fetch("http://localhost:9000/users")
      .then((res) => res.text())
      .then(response => setWelcomeMessage(response))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="app">
      <Header />
      <p>{welcomeMessage}</p>
    </div>
  );
}

export default App;
