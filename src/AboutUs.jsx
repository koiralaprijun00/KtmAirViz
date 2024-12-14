import { Heading, Avatar, Box, Center, Text, Stack, Button, Link, Badge, useColorModeValue, Flex, Spacer, Image } from "@chakra-ui/react"
import "../src/css/AboutUs.css"
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"

const OurProfile = () => {
  return (
    <Box className="about-us-right-container">
      <Flex flexDirection={{ base: "column", md: "row" }} mb={2} flexWrap="wrap" justifyContent="flex-start">
        {[
          { name: "Jordan", email: "jyjchian@kth.se", role: "User Testing/Development", imgSrc: "/img-jordan.jpg" },
          { name: "Prijun Koirala", email: "kprijun@gmail.com", role: "Main Developer", imgSrc: "/img-prijun.jpg" },
          { name: "Tianyi", email: "tianyini@kth.se", role: "Data/Development", imgSrc: "/img-tianyi.jpg" },
          { name: "Tingting", email: "tinl@kth.se", role: "UI/UX Design/Development", imgSrc: "/img-tingting.jpg" },
          { name: "Xinyue", email: "xinyhu@kth.se", role: "UI/UX Design/Development", imgSrc: "/img-xinyue.jpg" }
        ].map(({ name, email, role, imgSrc }) =>
          <Box
            key={name}
            mx={{ base: "auto", md: "4" }}
            mb={4}
            maxW={{ base: "full", md: "28%" }}
            flexBasis={{ base: "100%", md: "28%" }}
            bg={useColorModeValue("white", "gray.600")}
            boxShadow={"md"}
            rounded={"lg"}
            p={4}
            textAlign={"center"}
          >
            <Avatar size={"xl"} src={imgSrc} mb={4} />
            <Heading fontSize={"1xl"} fontFamily={"body"}>
              {name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {email}
            </Text>
            <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
              {role}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

const OurProject = () => {
  return (
    <Box className="aboutus-left-container">
      <Heading mt={4}>About Our Project</Heading>
      <br />
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <b>Our Goals</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            We aim to allow people to visualize the air pollution of Stockholm on their screens. Our website hopes to help ease commuters in avoiding polluted areas in their daily
            travels around the city.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <b>Future Plans</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Currently, we only have a webpage version but we aim to eventually develop a mobile application for this data visualization.
            <br />
            <br />
            We will also work towards incorporating other parts of Sweden, not just Stockholm, into the application to enable citizens to better plan their travelling routes if
            they are heading out of the city.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <b>Data Resources</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>Data for this visualization is obtained from SLB-analys and Stockholms Stad.</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <b>Acknowledgements</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            The success of this project is not without the following people; Mario Romero Vega and Joakim Rasmuson. Under their guidance, it enabled the team to develop CitizAir
            into what it is today.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

const PartnerLogos = () => {
  return (
    <Flex ml={10} w="40%" display="flex" alignItems="center" justifyContent="space-around" style={{ paddingBottom: "20px" }}>
      <Image
        boxSize={{ base: "80px", md: "100px" }}
        objectFit="contain"
        src="/img-slb.png"
        alt="Slb"

        maxH={{ base: "60px", md: "80px" }}
      />
      <Spacer mr={4} />
      <Image
        boxSize={{ base: "80px", md: "100px" }}
        objectFit="contain"
        src="/img-stockholm.png"
        alt="Stockholm Stad"

      />
      <Spacer mr={4} />
      <Image
        boxSize={{ base: "80px", md: "100px" }} 
        objectFit="contain"
        src="/img-kth.png"
        alt="Kth"

        maxH={{ base: "50px", md: "70px" }}
      />
    </Flex>
  )
}

const AboutUs = () => {
  return (
    <div className="about-us-main-container">
      <Flex p={10} direction={["column", "column", "row"]} wrap="wrap">
        <Box w={["109%", "45%", "45%"]} className="about-us-main-container">
          <OurProject />
          <Box mt={12}>
            <PartnerLogos />
          </Box>
        </Box>

        <Box mt={4} w={["100%", "45%", "45%"]} ml={["5%", "5%", "5%"]}>
          <Heading>Our Team</Heading>
          <OurProfile />
        </Box>
      </Flex>
    </div>
  )
}

export default AboutUs
