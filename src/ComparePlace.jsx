import React, { useEffect, useState } from "react"
import "../src/css/ComparePlace.css"
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Progress,
  CheckboxGroup,
  CloseButton,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react"
import { Flex, Spacer } from "@chakra-ui/react"
import SearchBar from "./SearchBar"

const ComparePlace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [aqiValue, setAqiValue] = useState(null)
  const [cityName, setCityName] = useState(null)
  const [aqiText, setAqiText] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState("aqi")
  const [selectedDate, setSelectedDate] = useState("d01")
  const [selectedAqi, setSelectedAqi] = useState(null)

  useEffect(() => {
    // Get the AQI Value of nearest Station
    fetch("https://api.waqi.info/feed/here/?token=a3bf1197881754e07fb1a334116289ffb6104296")
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

  useEffect(
    () => {
      // Call getAqiInfo whenever aqiValue changes
      const { text, color } = getAqiInfo(aqiValue)
      setAqiText(text)
      setBackgroundColor(color)
    },
    [aqiValue]
  ) // Dependency array, re-run this effect when aqiValue changes

  const getAqiInfo = aqiValue => {
    if (aqiValue >= 0 && aqiValue <= 25) {
      return { text: "Good", color: "#90EE90" }
    } else if (aqiValue <= 50) {
      return { text: "Fair", color: "#74A225" }
    } else if (aqiValue <= 100) {
      return { text: "Moderate", color: "#FFEBAF" }
    } else if (aqiValue <= 150) {
      return { text: "Unhealthy for Sensitive Groups", color: "#FFAA00" }
    } else if (aqiValue <= 200) {
      return { text: "Unhealthy", color: "#f65e5f" }
    } else if (aqiValue <= 300) {
      return { text: "Very Unhealthy", color: "#a070b6" }
    } else {
      return { text: "Hazardous", color: "#a06a7b" }
    }
  }

  const onSelectAqi = ({ aqi, name }) => {
    setAqiValue(aqi) // Update AQI value
    setCityName(name) // Update city name
  }

  const handleClick = (aqi, name, lat, lon) => {
    // Assuming onSelectAqi and onSelectLocation are props passed to SearchBar
    onSelectAqi({ aqi, name })
    onSelectLocation(lat, lon, name, aqi)
    setData([]) // This clears the search results within SearchBar itself
  }

  // Function to handle search result selection
  const handleResultSelect = () => {
    // Implement any additional logic needed upon selecting a search result
    // For now, it seems you directly clear search results in SearchBar, which might be sufficient
    console.log("Search result selected. Implement any additional logic as needed.")
  }

  return (
    <div className="container">
      <div className="toggle-bar">
        <Text
          ml={"0px"}
          color={"#91caff"}
          fontSize="sm"
          textDecoration="underline" // Apply underline to the text
          className="toggle-btn"
          onClick={onOpen}
        >
          Compare Place
        </Text>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Compare Places</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchBar onSelectAqi={onSelectAqi} onResultSelect={handleResultSelect} variant="page2" />
            <div className="heading-container" style={{ backgroundColor: backgroundColor }}>
              <div className="cp-heading-container">
                <div className="cp-aqi-text" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.8)">
                  {aqiText}
                </div>
                <div className="cp-header-aqi-value">
                  <Heading className="cp-search-header" as="h3" size="md" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.8)">
                    {cityName ? cityName : "Loading..."}
                  </Heading>
                  <div className="cp-aqi-value-container">
                    <div className="cp-aqi-value">
                      {aqiValue ? aqiValue : "..."}
                    </div>
                    <Text fontSize="xs" color="#495e1b">
                      AQI Value
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ComparePlace
