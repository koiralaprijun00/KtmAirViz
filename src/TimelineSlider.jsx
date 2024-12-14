import React, { useState, useEffect } from "react"
import "../src/css/TimelineSlider.css"

const TimelineSlider = ({ onHourChange }) => {
  const [currentHour, setCurrentHour] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDataType, setSelectedDataType] = useState("aqi")

  const handleSliderChange = event => {
    setCurrentHour(parseInt(event.target.value, 10))
  }

  const handleDataTypeChange = event => {
    setSelectedDataType(event.target.value)
  }

  useEffect(
    () => {
      // Now calling onHourChange with the selected data type
      onHourChange(currentHour, selectedDataType)
    },
    // Effect runs when currentHour or selectedDataType changes
    [currentHour, selectedDataType, onHourChange]
  )

  useEffect(
    () => {
      let interval = null
      if (isPlaying) {
        interval = setInterval(() => {
          setCurrentHour(prevHour => {
            const nextHour = prevHour + 1
            return nextHour > 71 ? 0 : nextHour // Reset to 0 after reaching the last hour
          })
        }, 1000) // Update every second
      } else if (!isPlaying && interval) {
        clearInterval(interval)
      }
      return () => clearInterval(interval) // Cleanup on unmount or when isPlaying changes
    },
    [isPlaying]
  )

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="timeline-slider">
      <h1 className="timeline-heading">72 Hour Forecast</h1>
      <div className="controls">
        <div className="play-button">
          <button onClick={togglePlay} className="play-pause-btn">
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
        <div className="main-timeline">
          <input className="timeline-input" type="range" min="0" max="71" value={currentHour} onChange={handleSliderChange} />
          <div className="timeline-labels">
            <span>H1</span>
            <span>H6</span>
            <span>H12</span>
            <span>H18</span>
            <span>H24</span>
            <span>H30</span>
            <span>H36</span>
            <span>H42</span>
            <span>H48</span>
            <span>H54</span>
            <span>H60</span>
            <span>H66</span>
            <span>H72</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSlider
