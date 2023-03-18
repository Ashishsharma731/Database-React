import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Linking } from './components/Linking';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div className="App">
      <Linking />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
