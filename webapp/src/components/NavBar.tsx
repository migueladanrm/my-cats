import { Grid, Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <Grid flexDirection="row" background="cyan.700" boxShadow="base">
    <Container maxW="container.xl" opacity={0.85} _hover={{ opacity: 1 }}>
      <Flex justifyContent="center" h="100%">
        <Flex alignItems="center" alignSelf="center" flexDirection="row">
          <Link to="/">
            <Flex
              alignItems="center"
              alignSelf="center"
              flexDirection="row"
              userSelect="none"
              fontSize="xl"
            >
              <Text color="gray.200">my</Text>
              <Text color="gray.50" fontWeight={600}>
                cats
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Container>
  </Grid>
);

export default NavBar;
