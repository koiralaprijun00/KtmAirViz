import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import { Text, Button, Box, Flex, Heading } from "@chakra-ui/react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const ComparisonChart = () => {
  const svgRef = useRef(null)
  const [currentView, setCurrentView] = useState(0)
  const views = [
    {
      name: "Original View",
      data: {
        name: "root",
        children: [{ name: "PM10", value: 80 }, { name: "PM2.5", value: 10 }]
      },
      text:
        "The PM in PM2.5 and PM10 stands for particulate matter and the value refers to the diameter of the particles. PM2.5 is less than 2.5 microns (μm) in diameter while PM10 is less than 10 microns (μm) in diameter."
    },
    {
      name: "Second View",
      data: {
        name: "root",
        children: [{ name: "Human Hair", value: 150 }, { name: "PM10", value: 20 }, { name: "PM2.5", value: 6 }]
      },
      text: "Both particle types are smaller than the width of human hair, which tends to be between 17 and 180 μm in diameter."
    }
  ]

  useEffect(
    () => {
      // const width = 600
      // const height = 300

      const isMobile = window.innerWidth < 768
      const width = isMobile ? window.innerWidth - 40 : 600 // 20px padding on each side for mobile
      const height = isMobile ? 200 : 300

      const svg = d3.select(svgRef.current).attr("width", width).attr("height", height).attr("text-anchor", "middle")

      const root = d3.hierarchy(views[currentView].data).sum(d => d.value).sort((a, b) => b.value - a.value)

      const pack = d3.pack().size([width, height]).padding(5)

      pack(root)

      // Setup for transitions
      const transitionDuration = 750 // Duration of the transition in milliseconds

      const nodeUpdate = svg.selectAll("g").data(root.descendants().slice(1), d => d.data.name) // Key function for object constancy

      // Handle exiting nodes
      nodeUpdate
        .exit()
        .transition()
        .duration(transitionDuration)
        .attr("transform", "scale(0.5)") // Scale down exiting nodes
        .remove()

      // Handle entering nodes
      const nodeEnter = nodeUpdate.enter().append("g")

      nodeEnter
        .append("circle")
        .attr("r", 0) // Initial radius 0 to grow from nothing
        .attr("fill", d => {
          if (d.data.name === "Human Hair") return "teal"
          if (d.data.name === "PM10") return "orange"
          if (d.data.name === "PM2.5") return "cyan"
          return "none" // Fallback color
        })

      nodeEnter
        .append("text")
        .text(d => d.data.name)
        .attr("dy", 0) // Start from center and move to final position
        .style("font-size", "0px") // Start from 0px and increase to final size

      // Merge and transition entering + updating nodes
      const nodeMerge = nodeEnter.merge(nodeUpdate)
      nodeMerge.transition().duration(transitionDuration).attr("transform", d => `translate(${d.x},${d.y})`)
      nodeMerge.select("circle").transition().duration(transitionDuration).attr("r", d => d.r)

      nodeMerge
        .select("text")
        .transition()
        .duration(transitionDuration)
        .attr("dy", 4) // Adjust position
        .style("font-size", d => {
          if (d.data.name === "Human Hair") return "18px"
          if (d.data.name === "PM10" || d.data.name === "PM2.5") return "12px"
          return "10px"
        })

      // Interactivity remains unchanged
      nodeMerge.on("mouseover", function() {
        d3.select(this).select("circle").style("fill-opacity", 0.95)
      })

      nodeMerge.on("mouseout", function() {
        d3.select(this).select("circle").style("fill-opacity", 1)
      })
    },
    [currentView, window.innerWidth]
  ) // Re-render when currentView changes

  const handleNextView = () => {
    if (currentView < views.length - 1) {
      setCurrentView(prevView => prevView + 1)
    }
  }

  const handlePreviousView = () => {
    if (currentView > 0) {
      setCurrentView(prevView => prevView - 1)
    }
  }

  return (
    <div id="comparison-chart" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box>
        <div className="button-container">
          <Button onClick={handlePreviousView} size={"xs"} leftIcon={<FaArrowLeft />} marginRight="10px" />
          <Button onClick={handleNextView} size={"xs"} rightIcon={<FaArrowRight />} />
        </div>
        <Heading as={"h3"} fontSize={"md"} mt={"15px"}>
          Pollutant particles have a smaller diameter than human hair
        </Heading>
        <Text fontSize="sm" textAlign="left" marginTop={"5px"}>
          {views[currentView].text}
        </Text>
      </Box>
      <svg className="svg-chart-circle" ref={svgRef} />
    </div>
  )
}

export default ComparisonChart
