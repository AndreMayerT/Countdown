import topImage from "./assets/top-image.svg"
import bottomImage from "./assets/bottom-image.svg"
import rocket from "./assets/rocket.svg"
import "./App.css"
import React, { useState, useEffect } from "react"

function Countdown() {}

function App() {
  const [seconds, setTime] = useState(
    Number(localStorage.getItem("seconds") || 59)
  )

  useEffect(() => {
    const interval = setInterval(() => setTime(seconds - 1), 1000)
    localStorage.setItem("seconds", JSON.stringify(seconds))
    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <div className="App">
      <img id="top-image" src={topImage} alt="" />

      <div className="content-wrapper">
        <div id="content">
          <h1>READY TO LAUNCH IN...</h1>

          <div className="timer">
            <div className="text">
              <p id="day">Days</p>
              <p id="hour">Hours</p>
              <p id="minute">Minutes</p>
              <p id="second">Seconds</p>
            </div>

            <div className="number">
              <p id="day_number">99</p>
              <p>:</p>
              <p id="hour_number">23</p>
              <p>:</p>
              <p id="minute_number">59</p>
              <p>:</p>
              <p id="second_number">
                {seconds.toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </p>
            </div>
          </div>
          <p className="subscribe-text">
            Subscribe to know more about the launch
          </p>

          <button type="button">Subscribe</button>
        </div>
        <img className="rocket" src={rocket} alt="" />
      </div>

      <img id="bottom-image" src={bottomImage} alt="" />
    </div>
  )
}

export default App
