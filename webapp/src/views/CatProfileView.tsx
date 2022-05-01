import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AppContainer from "../AppContainer";

const CatProfileView = (props: {}) => {
  // const location = useLocation();
  return (
    <Grid>
      <Container>
        <Flex direction="column">
          <Text>The Cat Name</Text>
        </Flex>
      </Container>
    </Grid>
  );
};

export default CatProfileView;
