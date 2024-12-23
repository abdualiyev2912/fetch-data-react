import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [advice, setAdvice] = useState(null);

  function fetchData() {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Serverdan ma'lumot olishda xato yuz berdi");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Olingan ma'lumot:", data);
        setAdvice(data.slip.advice);
      })
      .catch((error) => {
        console.error("Xato:", error.message);
      });
  }

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div className="container">
      <div className="card">

        <h1>Fetch API bilan ishlash</h1>
        {advice ? (
          <div>
            <h2 onClick={() => {navigator.clipboard.writeText(advice);}}>{advice}</h2>
          </div>
        ) : (
          <p>Initializing...</p>
        )}
        <button onClick={fetchData}>New advice</button>
      </div>
    </div>
  );
}

export default App;
