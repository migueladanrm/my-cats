import { Grid, Text } from "@chakra-ui/react";
import { NavBar } from "../components";

const AppContainer = (props: {}) => {
  return (
    <>
      <Grid minH="100vh">
        <NavBar />
        <Grid>
          <Text>Hello</Text>
        </Grid>
      </Grid>
    </>
  );
};

export default AppContainer;
