import {
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { Footer, NavBar } from "./components";
import { useSpinner } from "./hooks";

const AppContainer = (props: { children?: React.ReactNode }) => {
  const spinner = useSpinner();

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
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isOpen={spinner.isOpen}
        onClose={() => spinner.show(false)}
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
