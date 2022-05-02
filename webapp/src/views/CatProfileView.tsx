import {
  Avatar,
  AvatarBadge,
  Button,
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
import { Map } from "google-maps-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AppContainer from "../AppContainer";
import { catsState } from "../AppState";
import { CatMap } from "../components";
import { Cat } from "../models";

const CatProfileView = (props: {}) => {
  const { catId } = useParams();
  //const location = useLocation();

  const [cat, setCat] = useState<Cat | undefined>();
  const allCats = useRecoilValue(catsState);

  useEffect(() => {
    const targetCat = allCats.find((c) => c.id === catId);
    document.title = `My Cats / ${targetCat?.name}`;
    setCat(targetCat);
  }, []);

  return (
    <AppContainer>
      <Grid>
        <Container maxW="container.lg">
          <Flex direction="column">
            <Flex>
              <Avatar size="xl" src={cat?.profilePicture} boxShadow="lg">
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
              <Flex alignSelf="center" direction="column" ml={6}>
                <Text fontSize="3xl" fontWeight={600} letterSpacing="1px">
                  {cat?.name}
                </Text>
                <Text color="gray.500" fontSize="xl" fontStyle="italic">
                  Last seen 12 minutes ago
                </Text>
                {/* <Button></Button> */}
              </Flex>
            </Flex>
            <Grid mt={4}>
              <Tabs size="lg">
                <TabList>
                  <Tab>Info</Tab>
                  <Tab>Tracking</Tab>
                  <Tab>Gallery</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Flex direction="column">
                      <Flex direction="row-reverse">
                        <Button colorScheme="teal" variant="solid">
                          Edit
                        </Button>
                      </Flex>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex>
                    {/* <Text>Last Seen</Text> */}
                    {/* <Map/> */}
                    <CatMap/>

                    {/* <Map
      style={{ width: "60%", height: 500, position: "relative" }}
      google={props.google}
    ></Map> */}
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Grid>
          </Flex>
        </Container>
      </Grid>
    </AppContainer>
  );
};

export default CatProfileView;
