import {
  CircularProgress,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Footer, NavBar } from "./components";
import { useProgressSpinner } from "./hooks";

const AppContainer = (props: { children?: React.ReactNode }) => {
  const progressSpinner = useProgressSpinner();

  return (
    <>
      <Flex direction="column" minH="100vh" background="gray.100">
        <Grid h="60px">
          <NavBar />
        </Grid>
        <Grid py={4}>{props.children}</Grid>
      </Flex>
      <Grid>
        <Footer />
      </Grid>

      <Modal
        isCentered
        isOpen={progressSpinner.isOpen}
        onClose={() => progressSpinner.show(false)}
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody>
            <Flex justifyContent="center">
              <Spinner color="white" size="xl" thickness="4px" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppContainer;
