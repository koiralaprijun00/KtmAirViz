import React, { useState } from "react"
import "../src/css/MapLegend.css"

const MapLegend = ({ containerStyle }) => {
  const [tooltip, setTooltip] = useState({ show: false, content: null, x: 0, y: 0, color: "#fff" })
  const legendData = [
    { label: "Good", color: "#267300", info: "Air quality is considered satisfactory, and air pollution poses little or no risk." },
    {
      label: "Moderate",
      color: "#FFEBAF",
      info:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
    },
    {
      label: "Unhealthy for Sensitive Groups",
      color: "#FFAA00",
      info: "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
    },
    { label: "Unhealthy", color: "#FD8C3C", info: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects." },
    { label: "Very Unhealthy", color: "#B3840E", info: "Health warnings of emergency conditions. The entire population is likely to be affected." },
    { label: "Hazardous", color: "#E31C23", info: "Everyone may experience more serious health effects." }
  ]

  const scales = {
    Good: "0-50",
    Moderate: "51-100",
    "Unhealthy for Sensitive Groups": "100-150",
    Unhealthy: "151-200",
    "Very Unhealthy": "200-300",
    Hazardous: "300+"
  }

  const handleMouseEnter = (item, event) => {
    const { clientX: x, clientY: y } = event
    const tooltipContent = (
      <div>
        <div className="tooltip-scale">
          {item.label}: {scales[item.label]}
        </div>
        <div className="tooltip-info">
          {item.info}
        </div>
      </div>
    )
    setTooltip({ show: true, content: tooltipContent, x, y, color: item.color })
  }

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: null, x: 0, y: 0 })
  }

  return (
    <div className="legend-container" style={containerStyle}>
      {legendData.map((item, index) =>
        <div key={index} className="legend-item" style={{ backgroundColor: item.color }} onMouseEnter={e => handleMouseEnter(item, e)} onMouseLeave={handleMouseLeave}>
          <span className="legend-text">
            {item.label}
          </span>
        </div>
      )}
      {tooltip.show &&
        <div className="custom-tooltip" style={{ position: "fixed", left: tooltip.x, top: tooltip.y, backgroundColor: tooltip.color }}>
          {tooltip.content}
        </div>}
    </div>
  )
}

export default MapLegend
