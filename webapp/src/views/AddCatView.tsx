import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import AppContainer from "../AppContainer";

const AddCatView = (props: {}) => {
  return (
    <AppContainer>
      <Grid>
        <Container>
          <Text fontSize="6xl">Add Cat</Text>
          <Flex direction="column"></Flex>
        </Container>
      </Grid>
    </AppContainer>
  );
};
export default AddCatView;
