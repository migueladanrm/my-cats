import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AppContainer from "../AppContainer";
import { catsState } from "../AppState";
import { Cat } from "../models";
import moment from "moment";

import { FaCat, FaBirthdayCake } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import EditCatDialog from "./EditCatDialog";
import { CatsService } from "../services";
import { useSpinner } from "../hooks";
import { CatTrackingMap } from "../components";

const CatProfileView = (props: {}) => {
  const { catId } = useParams();

  const [cat, setCat] = useState<Cat | undefined>();
  const allCats = useRecoilValue(catsState);
  const deleteCatDialog = useDisclosure();
  const editCatDialog = useDisclosure();

  const spinner = useSpinner();
  const toast = useToast();

  const navigate = useNavigate();

  const handleEditCatDialogResult = (cat: Cat) => {
    spinner.show(true);
    CatsService.update(catId!, cat)
      .then((cat) => {
        toast({
          title: "Cat Updated",
          description: `'${cat?.name}' has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCat(cat);
      })
      .catch((err) => console.log(err))
      .finally(() => spinner.show(false));
  };

  const handleDeleteCat = () => {
    spinner.show(true);

    CatsService.delete(catId!)
      .then((_) => {
        toast({
          title: "Cat Deleted",
          status: "info",
          duration: 5000,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "An error occurred",
          description: `'${cat?.name}' could not be deleted.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => spinner.show(false));
  };

  useEffect(() => {
    CatsService.getById(catId!)
      .then((cat) => {
        document.title = `My Cats / ${cat?.name}`;
        setCat(cat);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContainer>
      <Grid>
        <Container maxW="container.lg">
          <Flex direction="column">
            <Flex justifyContent="space-between">
              <Flex>
                <Avatar size="xl" src={cat?.profilePicture} boxShadow="lg">
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
                <Flex alignSelf="center" direction="column" ml={6}>
                  <Text fontSize="3xl" fontWeight={600} letterSpacing="1px">
                    {cat?.name}
                  </Text>
                  <Text color="gray.500" fontSize="xl" fontStyle="italic">
                    {`last seen ${moment(cat?.lastSeen).fromNow(true)} ago`}
                  </Text>
                </Flex>
              </Flex>

              <Flex alignItems="center">
                <ButtonGroup size="md" isAttached variant="outline">
                  <Button
                    colorScheme="pink"
                    mr="-px"
                    onClick={() => editCatDialog.onOpen()}
                  >
                    Edit
                  </Button>
                  <IconButton
                    colorScheme="pink"
                    aria-label="Delete Cat"
                    icon={<DeleteIcon />}
                    onClick={() => deleteCatDialog.onOpen()}
                  />
                </ButtonGroup>
              </Flex>
            </Flex>
            <Grid mt={4}>
              <Tabs size="lg">
                <TabList>
                  <Tab>Info</Tab>
                  <Tab>Tracking</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Flex direction="column">
                      <Text
                        fontSize="xl"
                        fontWeight={600}
                        letterSpacing="2px"
                        pb={2}
                      >
                        BIO
                      </Text>

                      <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
                        {cat?.description ? (
                          <Text
                            color="gray.600"
                            fontSize="xl"
                            letterSpacing="1px"
                          >
                            {cat?.description}
                          </Text>
                        ) : (
                          <Text
                            color="gray.500"
                            fontSize="xl"
                            letterSpacing="1px"
                            fontStyle="italic"
                          >
                            No info
                          </Text>
                        )}
                      </Box>

                      <Text
                        fontSize="xl"
                        fontWeight={600}
                        letterSpacing="2px"
                        pb={2}
                        mt={8}
                      >
                        BASIC INFO
                      </Text>
                      <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
                        <Grid templateColumns="auto 1fr" gap={4}>
                          <GridItem>
                            <Tooltip label="Breed">
                              <span>
                                <Icon color="cyan.600" as={FaCat} h={8} w={8} />
                              </span>
                            </Tooltip>
                          </GridItem>
                          <GridItem alignSelf="center">
                            <Text fontSize="xl">{cat?.breed}</Text>
                          </GridItem>
                          <GridItem colSpan={2}>
                            <Divider />
                          </GridItem>
                          <GridItem>
                            <Tooltip label="Birthdate">
                              <span>
                                <Icon
                                  color="cyan.600"
                                  as={FaBirthdayCake}
                                  h={8}
                                  w={8}
                                />
                              </span>
                            </Tooltip>
                          </GridItem>
                          <GridItem alignSelf="center">
                            <Text fontSize="xl">
                              {cat?.birthdate
                                ? `${moment(
                                    cat?.birthdate
                                  ).calendar()} (${moment(cat?.birthdate).toNow(
                                    true
                                  )})`
                                : "Unknown"}
                            </Text>
                          </GridItem>
                          <GridItem colSpan={2}>
                            <Divider />
                          </GridItem>
                          <GridItem>
                            <Tooltip label="Added on Timestamp">
                              <span>
                                <Icon
                                  color="cyan.600"
                                  as={MdOutlineAccessTime}
                                  h={8}
                                  w={8}
                                />
                              </span>
                            </Tooltip>
                          </GridItem>
                          <GridItem alignSelf="center">
                            <Text fontSize="xl">
                              {moment(cat?.createdAt).calendar()}
                            </Text>
                          </GridItem>
                        </Grid>
                      </Box>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex direction="column">
                      {cat && (
                        <CatTrackingMap
                          cat={cat}
                          googleMapsApiKey=""
                          trackingPoint={{
                            point: {
                              longitude: 0.0,
                              latitude: 0.0,
                            },
                            createdAt: "",
                          }}
                        />
                      )}
                      <Button
                        alignSelf="center"
                        colorScheme="pink"
                        mt={8}
                        variant="solid"
                      >
                        Refresh
                      </Button>
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Grid>
          </Flex>
        </Container>
      </Grid>

      {cat && (
        <EditCatDialog
          cat={cat!}
          isOpen={editCatDialog.isOpen}
          onClose={editCatDialog.onClose}
          onSave={handleEditCatDialogResult}
        />
      )}

      {cat && (
        <Modal
          isCentered
          onClose={deleteCatDialog.onClose}
          isOpen={deleteCatDialog.isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Cat</ModalHeader>
            <ModalBody>
              <Text>{`Are you sure you want to delete '${cat.name}'?`}</Text>
              <Text>This action can not be undone.</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  deleteCatDialog.onClose();
                  handleDeleteCat();
                }}
              >
                Delete
              </Button>
              <Button variant="outline" onClick={deleteCatDialog.onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AppContainer>
  );
};

export default CatProfileView;
