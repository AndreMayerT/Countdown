import "./Timer.css"

export function Timer(props: {
  days: number
  hours: number
  minutes: number
  seconds: number
}) {
  return (
    <div className="timer">
      <div className="text">
        <p id="day">Days</p>
        <p id="hour">Hours</p>
        <p id="minute">Minutes</p>
        <p id="second">Seconds</p>
      </div>

      <div className="number">
        <p id="day_number">{String(props.days).padStart(2, "0")}</p>
        <p>:</p>
        <p id="hour_number">{String(props.hours).padStart(2, "0")}</p>
        <p>:</p>
        <p id="minute_number">{String(props.minutes).padStart(2, "0")}</p>
        <p>:</p>
        <p id="second_number">{String(props.seconds).padStart(2, "0")}</p>
      </div>
    </div>
  )
}
