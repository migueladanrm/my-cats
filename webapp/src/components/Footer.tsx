import { Flex, Grid, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Grid bg="cyan.900" py={8} dropShadow="md">
      <Flex justifyContent="center">
        <Text color="white">2022 MyCats</Text>
      </Flex>
    </Grid>
  );
};

export default Footer;
