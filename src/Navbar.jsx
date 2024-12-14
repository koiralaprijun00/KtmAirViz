import { Link } from "react-router-dom"
import { Heading } from "@chakra-ui/react"
import "../src/css/Navbar.css" // Assuming your CSS file path is correct
import ComparisonChart from "./ComparisonChart"
import { FAQAccordion } from "./AboutAirPollution"
import {
  Button,
  Flex,
  Spacer,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor
} from "@chakra-ui/react"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-sidebar">
        <Link to="/" className="menu-item">
          <Heading className="nav-heading" mr={"6"} size="lg">
          KTMAIRVIZ
          </Heading>
        </Link>
        <div className="right-menu">

          <div className="about-button">
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="blue">?</Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent mr="4" w="1200px" overflow="hidden">
                  <PopoverArrow />
                  <PopoverHeader>
                    <Heading as="h3" size="md">
                      Things to know about Air Pollution
                    </Heading>
                  </PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Flex w="100%" gap="20px">
                      <ComparisonChart w="50%" />
                      <FAQAccordion w="50%" />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
