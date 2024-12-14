import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3"
import { ThreeDayData } from "./ThreeDayData"
import { Select, Flex, Box } from "@chakra-ui/react"
import "../src/css/BarChart.css"

const BarChart = () => {
  const tooltipRef = useRef()
  const [selectedPollutant, setSelectedPollutant] = useState("NitrogenDioxide")

  const dayLabels = {
    d01: "Day 1",
    d02: "Day 2",
    d03: "Day 3"
  }

  useEffect(
    () => {
      updateChart(selectedPollutant)
    },
    [selectedPollutant]
  )

  const margin = { top: 30, right: 30, bottom: 70, left: 60 }
  const width = 420 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  const x = d3.scaleBand().range([0, width]).padding(0.1)
  const y = d3.scaleLinear().range([height, 0])

  const updateChart = selectedPollutant => {
    const data = ThreeDayData.data[selectedPollutant].values.map(({ time, value }) => ({ time, value }))

    x.domain(data.map(d => d.time))
    y.domain([0, d3.max(data, d => +d.value)])

    const svg = d3.select("#chart").html("")

    const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(data.map(d => d.time)).tickFormat((d, i) => ["March 12", "March 13", "March 14"][i]))
    chart.append("g").call(d3.axisLeft(y))

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0067b5")
      .attr("stroke-width", 2)
      .attr("d", d3.line().x(({ time }) => x(time) + x.bandwidth() / 2).y(({ value }) => y(value)))

    const tooltip = chart.append("div").attr("class", "tooltip").style("opacity", 0)

    chart
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", ({ time }) => x(time) + x.bandwidth() / 2)
      .attr("cy", ({ value }) => y(value))
      .attr("r", 10)
      .attr("fill", "#0067b5")
      .on("mouseover", (event, d) => {
        const tooltip = tooltipRef.current
        tooltip.style.visibility = "visible"
        tooltip.innerHTML = `${dayLabels[d.time]}<br/>Value: ${d.value}`
        let tooltipOffsetX = -20 // Horizontal offset from cursor - adjust as needed
        let tooltipOffsetY = -70 // Vertical offset from cursor - adjust to avoid overlap
        tooltip.style.left = `${event.clientX + tooltipOffsetX}px`
        tooltip.style.top = `${event.clientY + tooltipOffsetY}px`
        d3.select(event.currentTarget).attr("r", 12).attr("fill", "orange")
      })
      .on("mouseout", function() {
        const tooltip = tooltipRef.current
        tooltip.style.visibility = "hidden"
        d3.select(this).transition().duration(200).attr("r", 10).attr("fill", "#0067b5")
      })
  }

  const handlePollutantChange = event => {
    setSelectedPollutant(event.target.value)
  }

  return (
    <Flex direction="column" align="flex-start">
      <Box mt={4} mb={2}>
        <Select fontSize={"sm"} borderRadius={"none"} border={"none"} borderBottom={"1px"} value={selectedPollutant} onChange={handlePollutantChange}>
          <option value="NitrogenDioxide">Nitrogen Dioxide (NO2)</option>
          <option value="PM10">Particle - PM10</option>
          <option value="Ozone">Ozone(O3)</option>
          <option value="BirchPollen">Pollen</option>
          <option value="RiskIndexWithoutBirchPollen">AQHI</option>
          <option value="RiskIndexWithBirchPollen">AQI</option>
        </Select>
      </Box>
      <svg id="chart" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} />
      <div ref={tooltipRef} style={{ position: "absolute", visibility: "hidden", background: "white", border: "1px solid", padding: "5px" }}>
        Tooltip
      </div>
    </Flex>
  )
}

export default BarChart
