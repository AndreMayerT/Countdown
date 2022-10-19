import topImage from "./assets/top-image.svg"
import bottomImage from "./assets/bottom-image.svg"
import rocket from "./assets/rocket.svg"
import "./App.css"
import React, { useState, useEffect } from "react"
import axios from "axios"

function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

function App() {
  const [StartTime, setStartTime] = useState(new Date())
  const [EndTime, setEndTime] = useState()
  const [CurrentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    axios("http://localhost:3333/main").then((response) => {
      setStartTime(response.data)
    })
  }, [])

  useEffect(() => {
    const dateNow = new Date()
    const interval = setInterval(() => setCurrentTime(dateNow), 1000)
    return () => {
      clearInterval(interval)
      console.log(CurrentTime)
    }
  })

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
              <p id="second_number">59</p>
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
