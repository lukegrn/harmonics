import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      .then((json) => setResponse(json.message));
  }, []);

  return (
    <div>
      <h1>Harmonics</h1>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
