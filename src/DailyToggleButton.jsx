import React, { useState } from "react"
import "../src/css/DailyToggleButton.css" // Importing CSS file

const DailyToggleButton = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState("d01")

  const handleToggle = date => {
    setSelectedDate(date)
    onDateChange(date) // Call the callback function with the new date
  }

  return (
    <div>
      <button className={`button ${selectedDate === "d01" ? "active" : ""}`} onClick={() => handleToggle("d01")}>
        Day 1
      </button>
      <button className={`button ${selectedDate === "d02"  ? "active" : ""}`} onClick={() => handleToggle("d02")}>
        Day 2
      </button>
      <button className={`button ${selectedDate === "d03" ? "active" : ""}`} onClick={() => handleToggle("d03")}>
        Day 3
      </button>
    </div>
  )
}

export default DailyToggleButton
