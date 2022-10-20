import topImage from "./top-image.svg"
import bottomImage from "./bottom-image.svg"
import rocket from "./rocket.svg"
import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { Timer } from "./components/Timer/Timer"

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

function showAlert() {
  alert("Subscribed!")
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
    async function fetch() {
      await axios("https://countdown-67.herokuapp.com/main").then(
        (response) => {
          const startDate = new Date(response.data.createdAt)
          const startTimeMili = startDate.getTime()
          setstartTime(startTimeMili)
        }
      )
    }

    fetch()
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

          <Timer {...remainingTime} />

          <p className="subscribe-text">
            Subscribe to know more about the launch
          </p>

          <button onClick={showAlert}>Subscribe</button>
        </div>
        <img className="rocket" src={rocket} alt="" />
      </div>

      <img id="bottom-image" src={bottomImage} alt="" />
    </div>
  )
}

export default App
