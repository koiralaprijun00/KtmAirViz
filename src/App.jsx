import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import IsoplethMap from "./IsoplethMap"
import Sidebar from "./Sidebar"
//import TestCode from "./TestCode"

// Import Styling
import "../src/css/App.css"

const App = () => {
  const [selectedAqi, setSelectedAqi] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedDay, setSelectedDay] = useState("d01")
  const [aqiData, setAqiData] = useState({
    aqiValue: null,
    aqiText: null,
    cityName: null
  })

  const [selectedMetric, setSelectedMetric] = useState("aqi")

  const handleDayAndMetricChange = ({ day, metric }) => {
    setSelectedDay(day)
    setSelectedMetric(metric)
  }

  const handleDayChange = day => {
    setSelectedDay(day)
  }

  const updateAqiData = data => {
    setAqiData(data)
  }

  const handleSelectLocation = (lat, lon, name, aqi) => {
    setSelectedLocation({ lat, lon, name, aqi })
    // Assuming aqi is the value you want to use to update the Sidebar
    console.log("handleSelectLocation called with:", { lat, lon, name, aqi })
    const { text, color } = getAqiInfo(aqi) // You need to define or import this function based on your AQI value logic
    setAqiData({
      aqiValue: aqi,
      aqiText: text,
      backgroundColor: color, // You should add this to your state if it's not already there
      cityName: name
    })
  }

  const getAqiInfo = aqiValue => {
    if (aqiValue >= 0 && aqiValue <= 50) {
      return { text: "Good", color: "#267300" }
    } else if (aqiValue <= 100) {
      return { text: "Moderate", color: "#FFFFB5" }
    } else if (aqiValue <= 150) {
      return { text: "Unhealthy for Sensitive Groups", color: "#f99049" }
    } else if (aqiValue <= 200) {
      return { text: "Unhealthy", color: "#f65e5f" }
    } else if (aqiValue <= 300) {
      return { text: "Very Unhealthy", color: "#a070b6" }
    } else {
      return { text: "Hazardous", color: "#a06a7b" }
    }
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            index // This replaces the path="/" with index for the main component
            element={
              <div className="container">
                <div className="left-container">
                  <IsoplethMap selectedDay={selectedDay} selectedMetric={selectedMetric} onDayChange={handleDayChange} selectedLocation={selectedLocation} />
                </div>
                <div className="right-container">
                  <Sidebar onDayChange={handleDayAndMetricChange} aqiData={aqiData} selectedAqi={selectedAqi} onSelectLocation={handleSelectLocation} />
                </div>
              </div>
            }
          />
          {/* <Route path="/about-air-pollution" element={<AboutAirPollution />} /> */}
          {/* <Route path="/about-us" element={<AboutUs />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
