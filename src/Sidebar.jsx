import React, { useState, useRef, useEffect } from "react"

import DailyToggleButton from "./DailyToggleButton"
//import { ThreeDayData } from "./ThreeDayData" // Importing ThreeDayData object
import { HourlyData } from "./HourlyData"
import BarChart from "./BarChart"
import SearchBar from "./SearchBar"
import "../src/css/SearchBar.css"
import FullData from "../src/FullData.json"

import ComparePlace from "./ComparePlace"
// Import Styles
import { SimpleGrid, Box, Button, ButtonGroup, Checkbox, Progress, CheckboxGroup, useColorModeValue, Heading, Text, Stack, RadioGroup, Radio } from "@chakra-ui/react"
import { Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"
import { PhoneIcon, Search2Icon, AddIcon, WarningIcon } from "@chakra-ui/icons"
import "../src/css/Sidebar.css"
import ForecastMap from "./ForecastMap"

const Sidebar = ({ onDayChange, onSelectLocation, aqiData }) => {
  // const [aqiValue, setAqiValue] = useState(null)
  // const [cityName, setCityName] = useState(null)
  // const [aqiText, setAqiText] = useState(null)
  // const [backgroundColor, setBackgroundColor] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState("aqi")
  const [selectedDate, setSelectedDate] = useState("d01")
  const [selectedAqi, setSelectedAqi] = useState(null)

  const [aqiValue, setAqiValue] = useState(aqiData.aqiValue)
  const [cityName, setCityName] = useState(aqiData.cityName)
  const [aqiText, setAqiText] = useState(aqiData.aqiText)
  const [backgroundColor, setBackgroundColor] = useState(null)
  // Add a state for textColor
  const [textColor, setTextColor] = useState("white") // Default color

  useEffect(() => {
    //Get the AQI Value of nearest Station
    // fetch("https://api.waqi.info/feed/here/?token=a3bf1197881754e07fb1a334116289ffb6104296")
    fetch("https://api.waqi.info/feed/@10011/?token=a3bf1197881754e07fb1a334116289ffb6104296")
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok") {
          setAqiValue(data.data.aqi)
          const placeName = data.data.city.name.split(" ")
          setCityName(placeName.slice(0, 4).join(" "))
          const { text, color } = getAqiInfo(data.data.aqi)
          setAqiText(text)
          setBackgroundColor(color)
        } else {
          console.error("Error fetching data:", data.message)
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }, [])

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

  const handleDateAndMetricChange = (date, metric) => {
    console.log("Updating day and metric:", { date, metric })
    setSelectedDate(date) // Update the selectedDate state
    setSelectedMetric(metric) // Update the selectedMetric state
    onDayChange({ day: date, metric }) // Notify the parent component
  }

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value)
  }

  const onSelectAqi = ({ aqi, name, lat, lon }) => {
    setAqiValue(aqi)
    setCityName(name)
    // Call the passed function from parent component
    onSelectLocation(lat, lon, "Location Name", "AQI Value")
  }

  // Effect hook to update component state when aqiData prop changes
  useEffect(
    () => {
      setAqiValue(aqiData.aqiValue)
      setCityName(aqiData.cityName)
      setAqiText(aqiData.aqiText)
      // Assuming you want to directly use a background color determined by the AQI value
      // Assume this function is updated to also return a suitable text color along with the background color
      const { backgroundColor, textColor } = determineAqiStyles(aqiData.aqiValue)
      setBackgroundColor(backgroundColor)
      // New state for text color
      setTextColor(textColor) // Assuming you've added a useState hook for textColor
    },
    [aqiData]
  )

  // Updated function to determine styles based on AQI value
  const determineAqiStyles = aqiValue => {
    let styles = {
      backgroundColor: "#FFFFFF", // Default
      textColor: "black" // Default
    }
    if (aqiValue >= 0 && aqiValue <= 50) {
      styles = { backgroundColor: "#267300", textColor: "white" } // Good
    } else if (aqiValue <= 100) {
      styles = { backgroundColor: "#FFFFB5", textColor: "black" } // Moderate
    } else if (aqiValue <= 150) {
      styles = { backgroundColor: "#f99049", textColor: "black" } // Unhealthy for Sensitive Groups
    } // Add more conditions as necessary

    return styles
  }

  return (
    <div className="sidebar-container">
      <SearchBar variant="page1" onSelectAqi={onSelectAqi} onSelectLocation={onSelectLocation} />
      <div className="heading-container" style={{ backgroundColor: aqiData.backgroundColor }}>
        <div className="header-aqi-value">
          <Heading className="search-header" as="h3" size="md" mb="4" style={{ color: textColor }}>
            {cityName ? cityName : "Loading..."}
            {/* {cityName ? cityName : <Text fontSize="sm">Loading...</Text>} */}
            <ComparePlace />
          </Heading>
          <div className="aqi-value-container">
            <div className="aqi-value" style={{ color: textColor }}>
              {/* {aqiValue} */}
              {aqiValue ? aqiValue : "..."}
            </div>
            <Text fontSize="xs" color={"white"}>
              AQI Value
            </Text>
          </div>
        </div>
        <div className="aqi-text" style={{ color: textColor }}>
          {aqiData.aqiText}
        </div>
      </div>
      <div className="filter-section">
        <Heading as={"h3"} fontSize={"md"} mb={"4"}>
          Select Pollutant Particles and Day
        </Heading>
        <Box mr="2" mb="4">
          <RadioGroup value={selectedMetric} onChange={value => handleDateAndMetricChange(selectedDate, value)}>
            <Stack spacing={[1, 8]} direction={["column", "row"]}>
              <Radio value="aqi">AQI</Radio>
              <Radio value="pm10">PM10</Radio>
              <Radio value="nox">NoX</Radio>
              <Radio value="pollen">Pollen</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <DailyToggleButton onDateChange={date => handleDateAndMetricChange(date, selectedMetric)} />
        </Box>
      </div>
      <Accordion defaultIndex={[0]} bg={"gray.100"} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
              <Box as="span" flex="1" textAlign="left">
                Daily Forecast - Stockholm City
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <BarChart />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
              <Box as="span" flex="1" textAlign="left">
                72 Hour Forecast - Stockholm City
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ForecastMap />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Sidebar
