import React, { useRef, useEffect } from "react"
import  ComparisonChart  from "./ComparisonChart"
import { Box, Flex, Heading, Stack, Text, Link, Button, VStack } from "@chakra-ui/react"
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"

import "../src/css/AboutAirPollution.css"

export const AirQualityIndex = () => {
  const categories = [
    {
      name: "Good",
      color: "#a8e05f",
      description: "Air quality is considered satisfactory, and air pollution poses little or no risk."
    },
    {
      name: "Moderate",
      color: "#fdd64b",
      description:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
    },
    {
      name: "Unhealthy for Sensitive Groups",
      color: "#f99049",
      description: "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
    },
    {
      name: "Unhealthy",
      color: "#f65e5f",
      description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects."
    },
    {
      name: "Very Unhealthy",
      color: "#a070b6",
      description: "Health warnings of emergency conditions. The entire population is likely to be affected."
    },
    {
      name: "Hazardous",
      color: "#a06a7b",
      description: "Everyone may experience more serious health effects."
    }
  ]

  return (
    <Stack spacing={4} align="stretch">
      <Heading as="h2" size="lg" p={4} bg="gray.100" textAlign="center">
        How Good is The Weather?
      </Heading>
      {categories.map((category, index) =>
        <Box key={index} bg={category.color} p={4} color="#3b3b3b">
          <Heading as="h3" size="md">
            {category.name}
          </Heading>
          <Text mt={2}>
            {category.description}
          </Text>
        </Box>
      )}
    </Stack>
  )
}

export const UsefulLinks = () => {
  const links = [
    {
      title: "Air Pollution: Impact and Prevention",
      description:
        "Air pollution is becoming a major health problem affecting millions worldwide. In support of this observation, the World Health Organization estimates that every year, 2.4 million people die because of the effects of air pollution on health.",
      href: "https://onlinelibrary.wiley.com/doi/full/10.1111/j.1440-1843.2012.02213.x"
    },
    {
      title: "Health Impact of Air Pollution to Children",
      description:
        "Health impact of air pollution to children was studied over the last twenty years in heavily polluted parts of the Czech Republic during. The research program (Teplice Program) analyzed these effects in the polluted district Teplice (North Bohemia) and control district Prachatice (Southern Bohemia).",
      href:
        "https://www.sciencedirect.com/science/article/pii/S143846391200137X?casa_token=CJJf8x_puj4AAAAA:1eMZAZQKGVYpqDYxnbbT5aoxozcyhJdM1I8bD09gc6aa9bFqgypR67SrhvqVQ3O-61m2PNoiy8Y"
    },
    {
      title: "Public-health Impact of Outdoor and Traffic-related Air Pollution: A European Assessment",
      description:
        "Air pollution contributes to mortality and morbidity. We estimated the impact of outdoor (total) and traffic-related air pollution on public health in Austria, France, and Switzerland. Attributable cases of morbidity and mortality were estimated.",
      href: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(00)02653-2/abstract?cc=y%3D%5B%2Fquote%5D"
    },
    {
      title: "Human Health Effects of Air Pollution",
      description:
        "Over the past three or four decades, there have been important advances in the understanding of the actions, exposure-response characteristics, and mechanisms of action of many common air pollutants.",
      href: "https://ehp.niehs.nih.gov/doi/abs/10.1289/ehp.9310045"
    },
    {
      title: "Health Effects of Air Pollution: A Statistical Review",
      description: "We critically review and compare epidemiological designs and statistical approaches to estimate associations between air pollution and health.",
      href:
        "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1751-5823.2003.tb00195.x?casa_token=CUzraUzgekAAAAAA:DjKITwAXfUWZ-ztmWrbqewc3NUlfIQjhpb0GKGeoksx5QJiN-xcwLzOS9xhQt1CK7hejKU4aahlR6aI"
    }
  ]

  return (
    <Box>
      <Heading as="h1" size="lg" paddingBottom={4}>
        Impact on Health
      </Heading>
      <Box maxH="calc(100vh - 200px)" overflowY="auto">
        <VStack spacing={5} align="stretch">
          {links.map((link, index) =>
            <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" backgroundColor="white">
              <Heading as="h2" size="md" paddingBottom={3}>
                {link.title}
              </Heading>
              <Text paddingBottom={3}>
                {link.description}
              </Text>
              <Link href={link.href} isExternal>
                <Button colorScheme="blue">Learn More →</Button>
              </Link>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

export const FAQAccordion = () =>
  <div>
    {/* <Heading as="h3" size="md" my="4">
      Air Pollutants
    </Heading> */}
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is PM?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          PM stands for Particulate Matter, which is a mixture of solid particles and liquid droplets in the air. Particles are defined by their diameter for air quality regulatory
          purposes. Those with a diameter of 10 microns or less (PM10) are inhalable into the lungs and can induce adverse health effects. Fine particulate matter is defined as
          particles that are 2.5 microns or less in diameter (PM2.5).
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is O3?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          O3 (Ozone) is a gas molecule composed of three oxygen atoms. Ozone is good up high, bad nearby. The ozone layer found high in the upper atmosphere shields us from much of
          the sun's ultraviolet radiation. However, ozone air pollution at ground level where we can breathe it causes serious health problems. Ozone aggressively attacks lung
          tissue by reacting chemically with it.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is NOx?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          NO and NO2 are two kinds of gases and are referred as NOx (Nitrogen Oxides). NO2 (Nitrogen Dioxide) at high concentrations causes inflammation of the airways. Breathing
          in high levels of NO2 can increase the likelihood of respiratory problems: wheezing, coughing, colds, flu and bronchitis. People with asthma are prone to have more
          intense attacks. Prolonged exposure to high levels of NO2 can cause irreversible damages to the respiratory system.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is Birch Pollen?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Birch trees are trees with beige, silvery or white bark that is often flaky. They are part of the order Fagales and the family Betulaceae of trees. Birch pollen allergy
          is one of the most common seasonal allergies. Between 8-16% of people are sensitized to the allergen. The birch pollen count will typically be highest in the morning. But
          as you go throughout your day, the pollen may collect on your clothes, skin and hair. You then breathe it in as you go about your day or when you sleep at night.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "#3182CE", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              What is AQI?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          AQI stands for Air Quality Index, which serves as a tool to communicate daily air quality by incorporating measurements of five key air pollutants: ground-level ozone,
          particulate matter, carbon monoxide, sulfur dioxide, and nitrogen dioxide. AQI runs from 0 to 500 where a lower score indicates cleaner air and a higher score denotes
          poorer air condition.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>

// const AboutAirPollution = () =>
//   <div className="about-us-container">
//     <div className="about-pollution-heading-mobile-view" ml={6} mt={12}>
//       About Air Pollution
//     </div>
//     <Flex direction={{ base: "column", md: "row" }} justify="space-between" className="main-container">
//       <Flex direction="column" className="first-col" p={4} flex="1">
//         <ComparisonChart />
//         <FAQAccordion className="faq-accordion" />
//       </Flex>
//       <Flex className="second-col" p={4} flex="1">
//         <AirQualityIndex />
//       </Flex>
//       <Flex className="third-col" p={4} flex="1">
//         <UsefulLinks />
//       </Flex>
//     </Flex>
//   </div>
