import React, { useEffect, useState } from "react";
import "./App.css";

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
      <header className="app-header">
        <p>{welcomeMessage}</p>
      </header>
    </div>
  );
}

export default App;
