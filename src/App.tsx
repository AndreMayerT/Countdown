import topImage from "./assets/top-image.svg"
import bottomImage from "./assets/bottom-image.svg"
import rocket from "./assets/rocket.svg"
import "./App.css"
import React, { useState, useEffect } from "react"
import axios from "axios"

function getRemaningTime(start: number, current: number, end: number) {
  const countdown_mili = end - (current - start)
  const days = Math.floor(countdown_mili / (24 * 60 * 60 * 1000))
  const dayscountdown_mili = countdown_mili % (24 * 60 * 60 * 1000)
  const hours = Math.floor(dayscountdown_mili / (60 * 60 * 1000))
  const hourscountdown_mili = countdown_mili % (60 * 60 * 1000)
  const minutes = Math.floor(hourscountdown_mili / (60 * 1000))
  const minutescountdown_mili = countdown_mili % (60 * 1000)
  const sec = Math.floor(minutescountdown_mili / 1000)

  return { days: days, hours: hours, minutes: minutes, seconds: sec }
}

function App() {
  const [startTime, setstartTime] = useState(0)
  const [currentTime, setcurrentTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const endTime = 2592000000

  useEffect(() => {
    axios("http://localhost:3333/main").then((response) => {
      const startDate = new Date(response.data.createdAt)
      const startTimeMili = startDate.getTime()
      setstartTime(startTimeMili)
    })
  }, [])

  useEffect(() => {
    let dateNow = new Date()
    let time = dateNow.getTime()
    const interval = setInterval(() => setcurrentTime(time), 1000)
    setRemainingTime(getRemaningTime(startTime, currentTime, endTime))
    return () => {
      clearInterval(interval)
    }
  }, [currentTime])

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
              <p id="day_number">
                {String(remainingTime.days).padStart(2, "0")}
              </p>
              <p>:</p>
              <p id="hour_number">
                {String(remainingTime.hours).padStart(2, "0")}
              </p>
              <p>:</p>
              <p id="minute_number">
                {String(remainingTime.minutes).padStart(2, "0")}
              </p>
              <p>:</p>
              <p id="second_number">
                {String(remainingTime.seconds).padStart(2, "0")}
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
