import React, { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import MapLegend from "./MapLegend"
import TimelineSlider from "./TimelineSlider"
import "../src/css/IsoplethMap.css"

const IsoplethMap = ({ selectedDay, selectedMetric, selectedLocation }) => {
  const [map, setMap] = useState(null)
  const [markerCoordinates, setMarkerCoordinates] = useState(null)
  const [selectedOption, setSelectedOption] = useState("aqi")

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia3ByaWp1biIsImEiOiJjajd4OHVweTYzb2l1MndvMzlvdm90c2ltIn0.J25C2fbC1KpcqIRglAh4sA"
    const mapInstance = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/kprijun/clsns5ahr006g01pkfe183e2m",
      center: [18.0686, 59.3293], // Stockholm City
      zoom: 13,
      minZoom: 10.2
    })

    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(mapInstance)

    // Cleanup function
    return () => {
      mapInstance.remove()
    }
  }, [])

  useEffect(
    () => {
      let marker // Declare marker outside so it's accessible in the cleanup function

      if (map && selectedLocation) {
        const getAqiInfo = aqiValue => {
          if (aqiValue >= 0 && aqiValue <= 50) {
            return { text: "Good", color: "#C0E49A" }
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
        // Use getAqiInfo to get text and color based on AQI value
        const { text: aqiText, color: aqiColor } = getAqiInfo(selectedLocation.aqi)

        // Create a popup with dynamic content based on AQI
        const popupContent = `
        <div>
        <h3>${selectedLocation.name}</h3>
        <p>AQI: ${selectedLocation.aqi} - <span style="color: ${aqiColor};">${aqiText}</span></p>
      </div>`

        // Create a popup instance
        const popup = new mapboxgl.Popup({ offset: 25, className: "my-custom-popup" }).setHTML(popupContent)

        const marker = new mapboxgl.Marker()
          .setLngLat([selectedLocation.lon, selectedLocation.lat])
          .setPopup(popup) // This should associate the popup with the marker
          .addTo(map)

        // Optionally, center the map on the marker
        map.flyTo({
          center: [selectedLocation.lon, selectedLocation.lat],
          essential: true,
          zoom: 14
        })

        const markerElement = marker.getElement()
        markerElement.addEventListener("mouseenter", () => popup.addTo(map)) // Show popup on hover
        markerElement.addEventListener("mouseleave", () => popup.remove()) // Hide popup on mouse leave
      }

      // Cleanup function to remove the marker and popup when the component unmounts or selectedLocation changes
      return () => {
        if (marker) {
          marker.remove() // This removes the marker from the map
        }
      }
    },
    [map, selectedLocation]
  ) // Depend on map and selectedLocation

  useEffect(
    () => {
      if (map && selectedDay && selectedMetric) {
        // const hourFormatted = currentHour.toString().padStart(2, "0")
        // const imagePath = `./raster-image/${selectedMetric}_daily/${selectedMetric}_${selectedDay}_raster.png`

        map.loadImage(`./raster-image/${selectedMetric}_daily/${selectedMetric}_${selectedDay}_raster.png`, (error, image) => {
          if (error) {
            console.error("Failed to load image:", error)
            return
          }

          if (map.getSource("overlay")) {
            map.removeLayer("overlay")
            map.removeSource("overlay")
            map.removeImage("overlay")
          }

          map.addImage("overlay", image)

          map.addSource("overlay", {
            type: "image",
            url: `./raster-image/${selectedMetric}_daily/${selectedMetric}_${selectedDay}_raster.png`,
            coordinates: [[17.732179, 59.522258], [18.348042, 59.522258], [18.348042, 59.208266], [17.732179, 59.208266]]
          })

          map.addLayer({
            id: "overlay",
            type: "raster",
            source: "overlay",
            paint: {
              "raster-opacity": 0.65
            }
          })
        })
      }
    },
    [map, selectedDay, selectedMetric, selectedLocation]
  )

  useEffect(
    () => {
      if (!map || !selectedLocation) return

      const marker = new mapboxgl.Marker().setLngLat([selectedLocation.lon, selectedLocation.lat]).addTo(map)

      map.flyTo({
        center: [selectedLocation.lon, selectedLocation.lat],
        essential: true,
        zoom: 14
      })

      return () => marker.remove()
    },
    [map, selectedLocation]
  )

  const updateMapForSelectedHour = hour => {
    if (!map) return
    const imageName = `h${hour}`
    const imagePath = `./raster-image/aqi_daily/aqi_${imageName}_raster.png`

    // Logic to load and display the image on the map
    // This can vary depending on how you're managing map layers and sources
    if (map.getSource("hourlyOverlay")) {
      map.removeLayer("hourlyOverlay")
      map.removeSource("hourlyOverlay")
    }

    map.loadImage(`./raster-image/${selectedMetric}_daily/${selectedMetric}_${imageName}_raster.png`, (error, image) => {
      if (error) throw error

      map.addImage("hourlyOverlayImage", image)
      map.addSource("hourlyOverlay", {
        type: "image",
        url: `./raster-image/${selectedMetric}_daily/${selectedMetric}_${imageName}_raster.png`,
        coordinates: [[17.732179, 59.522258], [18.348042, 59.522258], [18.348042, 59.208266], [17.732179, 59.208266]] // Define corners of the image
      })

      map.addLayer({
        id: "hourlyOverlay",
        type: "raster",
        source: "hourlyOverlay",
        paint: { "raster-opacity": 0.65 }
      })
    })
  }

  // This function should be inside your IsoplethMap component
  const handleSelectLocation = (lat, lng) => {
    setMarkerCoordinates({ lat, lng })
  }

  const handleSelectChange = event => {
    setSelectedOption(event.target.value)
  }

  const handleHourChange = hour => {
    // Assuming you have a function to update the map based on the selected hour
    updateMapForSelectedHour(hour)
  }

  return (
    <div id="isopleth-map-container">
      <div id="map-container">
        <div className="timeline-slider-container">
          <TimelineSlider onHourChange={handleHourChange} />
        </div>
        <MapLegend />
      </div>
    </div>
  )
}

export default IsoplethMap
