import React, { useState, useEffect, useRef } from "react"
import "../src/css/SearchBar.css"
import { SearchIcon } from "@chakra-ui/icons" // Import the search icon
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import FullData from "./FullData.json"

const SearchBar = ({ onSelectAqi, onSelectLocation, variant, onResultSelect  }) => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(null)
  const [inputValue, setInputValue] = useState("") 
  const searchResultsRef = useRef(null)


  useEffect(() => {
    fetch("https://api.waqi.info/search/?keyword=stockholm&token=a3bf1197881754e07fb1a334116289ffb6104296")
      .then(response => response.json())
      .then(apiData => {
        const combinedData = [...apiData.data, ...FullData] // Combine API data with local data
        setData(combinedData)
        setFilterData(combinedData)
      })
      .catch(error => console.log(error))


    const handleClickOutside = event => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setData([])
      }
    }

    // Adding event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFilter = value => {
    setInputValue(value) // Update the input value as user types
    if (filterData) {
      // const response = filterData.filter(f => f.station.name.toLowerCase().includes(value.toLowerCase()))
      const response = filterData.filter(f => f.station?.name.toLowerCase().includes(value.toLowerCase()));
      setData(response)
      if (value === "") {
        setData([])
      }
    }
  }

  // const handleClick = (aqi, name, lat, lon) => {
  //   onSelectAqi({ aqi, name }) // Keep your existing functionality
  //   onSelectLocation(lat, lon, name, aqi) // Log the latitude and longitude to the console.
  //   setData([]) // Clear search results.
  //   setInputValue(name) // Set the input value to the selected location's name.
  //   onResultSelect();
  // }


  const handleClick = (aqi, name, lat, lon) => {
    onSelectAqi({ aqi, name }); // Existing functionality is fine
  
    // Check if onSelectLocation is a function before calling it
    if (typeof onSelectLocation === 'function') {
      onSelectLocation(lat, lon, name, aqi); // Only call it if it's a function
    }
  
    setData([]); // Clear search results.
    setInputValue(name); // Set the input value to the selected location's name.
    if (typeof onResultSelect === 'function') {
      onResultSelect(); // Also, ensure this is a function before calling
    }
  };
  // Function to remove specific words from station name
  const removeWordsFromStationName = stationName => {
    // List of words to remove
    const wordsToRemove = ["stockholm", "sweden", ",", "108", "59", "70", "E4", "107", "E20", "83"] // Add the words you want to remove here

    // Constructing a regular expression pattern to match any of the words to remove
    const pattern = new RegExp(wordsToRemove.join("|"), "gi")

    // Removing the words from the station name using the regular expression
    return stationName.replace(pattern, "")
  }

  return (
    <div className={`input-wrapper ${variant}`}>
      <InputGroup>
        <Input type="text" placeholder="Search Location..." value={removeWordsFromStationName(inputValue)} onChange={e => handleFilter(e.target.value)} />
        <InputRightElement width="4.5rem">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      {inputValue &&
      data.length > 0 && // Add this condition to render search results only if inputValue is not empty and data has elements
        <div className="search-results" ref={searchResultsRef}>
          {data.map((d, i) =>
  <div key={i} onClick={() => handleClick(d.aqi, d.station?.name, d.station?.geo[0], d.station?.geo[1])}>
    {removeWordsFromStationName(d.station?.name)}
  </div>
          )}
        </div>}
    </div>
  )
}

export default SearchBar
