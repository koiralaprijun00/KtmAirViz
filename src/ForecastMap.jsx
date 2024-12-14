import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import AqiHrData from "./AqiHrData.json"
import { Flex, Box, Select } from "@chakra-ui/react"

import "../src/css/ForecastMap.css"

const ForecastMap = () => {
  const svgRef = useRef(null)
  const tooltipRef = useRef(null)
  const [selectedOption, setSelectedOption] = useState("no2") // Initialize with default option

  useEffect(
    () => {
      if (!AqiHrData[selectedOption]) return

      const margin = { top: 10, right: 30, bottom: 30, left: 30 }
      const width = 400 - margin.left - margin.right
      const height = 200 - margin.top - margin.bottom
      const rows = 6
      const cols = 12
      const rowHeight = height / rows
      const colWidth = width / cols
      const values = AqiHrData[selectedOption].map(d => d.value)

      // Clear previous svg content
      d3.select(svgRef.current).selectAll("*").remove()

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      // Updated color scale
      const color = d3.scaleLinear().domain([d3.min(values), d3.max(values)]).range(["#C0E49A", "#FFFFB5"])

      // Define X-axis with hours 1 to 12
      const hours = Array.from({ length: 12 }, (_, i) => i + 0) // Generates hours from 1 to 12
      const xScale = d3.scalePoint().domain(hours).range([0, width])
      const xAxis = d3.axisBottom(xScale) // No need to filter for clarity as we are only dealing with 12 points

      // Add X-axis to the svg
      svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis)

      const enrichedData = AqiHrData[selectedOption].map((d, i) => ({
        value: d.value,
        // Assuming your dataset starts at 0 hours; adjust as necessary
        hour: i % 24,
        period: i < 12 ? "AM" : "PM"
      }))

      // Manually add AM and PM labels
      const periodLabels = ["AM", "PM", "AM", "PM", "AM", "PM"]
      svg
        .selectAll(".periodLabel")
        .data(periodLabels)
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", -10) // Adjust X position based on your margin and desired placement
        .attr("y", (d, i) => i * rowHeight + rowHeight / 2 + 5) // Center text in each row, adjust +5 for better alignment
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "10px")

      svg
        .selectAll("rect")
        .data(enrichedData) // Use the enriched data with hour and period
        .enter()
        .append("rect")
        .attr("x", (_, i) => i % cols * colWidth)
        .attr("y", (_, i) => Math.floor(i / cols) * rowHeight)
        .attr("width", colWidth)
        .attr("height", rowHeight)
        .attr("fill", d => color(d.value))
        .on("mouseover", (event, d) => {
          // Calculate the display hour (convert 0-23 hour format to 1-12 format)
          const displayHour = (d.hour % 12 || 12) + d.period
          // Display the hour and value in the tooltip
          d3.select(tooltipRef.current).style("visibility", "visible").text(`Hour: ${displayHour}, Value: ${d.value}`)
        })
        .on("mousemove", event => {
          d3.select(tooltipRef.current).style("top", event.pageY - 70 + "px").style("left", event.pageX - 50 + "px")
        })
        .on("mouseout", () => {
          d3.select(tooltipRef.current).style("visibility", "hidden")
        })
    },
    [selectedOption]
  )

  const handleSelectChange = event => {
    setSelectedOption(event.target.value)
  }

  return (
    <Flex mt="4" flexDirection="column" alignItems="flex-start">
      <Box mt={4} mb={2}>
        <Select onChange={handleSelectChange} value={selectedOption}>
          <option value="no2">Nitrogen Dioxide (NO2)</option>
          <option value="pm10">Particle - PM10</option>
          <option value="ozone">Ozone (O3)</option>
          <option value="birch">Pollen</option>
          <option value="aqhich">AQHICH</option>
          <option value="aqhi">AQHI</option>
        </Select>
      </Box>
      <div ref={tooltipRef} style={{ position: "absolute", visibility: "hidden", background: "white", border: "1px solid", padding: "5px" }}>
        Tooltip
      </div>
      <svg ref={svgRef} />
    </Flex>
  )
}

export default ForecastMap
