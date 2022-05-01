import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./components";

const AppContainer = (props: { children?: React.ReactNode }) => {
  return (
    <>
      <Flex direction="column" minH="100vh" background="gray.100">
        <Grid h="60px">
          <NavBar />
        </Grid>
        <Grid>{props.children}</Grid>
      </Flex>
    </>
  );
};

export default AppContainer;
