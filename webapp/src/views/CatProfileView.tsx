import {
  Container,
  Flex,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AppContainer from "../AppContainer";

const CatProfileView = (props: {}) => {
  const location = useLocation();
  return (
    <AppContainer>
      <Grid>
        <Container>
          <Flex direction="column">
            <Text fontSize="4xl">The Cat Name</Text>
            <Tabs>
              <TabList>
                <Tab>Info</Tab>
                <Tab>Tracking</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Container>
      </Grid>
    </AppContainer>
  );
};

export default CatProfileView;
