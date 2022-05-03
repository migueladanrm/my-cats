import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCat } from "react-icons/fa";
import { Cat } from "../models";
import { BaseCatValidator } from "../validators";

const EditCatDialog = (props: {
  cat: Cat;
  isOpen: boolean;
  onClose: () => void;
  onSave: (cat: Cat) => void;
}) => {
  const [cat, setCat] = useState<Cat>(props.cat);
  const [formValidation, setFormValidation] = useState<ValidationErrors<Cat>>(
    {}
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCat({ ...cat, [name]: value });
  };

  const handleSaveButtonClick = () => {
    const validation = new BaseCatValidator().validate(cat);
    if (0 < Object.keys(validation).length) {
      setFormValidation(validation);
      return;
    }

    props.onSave(cat);
    props.onClose();
  };

  useEffect(() => setCat(props.cat), [props]);

  return (
    <>
      <Modal isCentered isOpen={props.isOpen} onClose={props.onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Cat</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl
                isRequired
                isInvalid={formValidation.name !== undefined}
              >
                <Flex direction="column" alignItems="center">
                  <Avatar
                    colorScheme="teal"
                    icon={<Icon color="gray.50" as={FaCat} h={16} w={16} />}
                    p={8}
                    size="2xl"
                    boxShadow="md"
                  />
                </Flex>
                <FormLabel htmlFor="cat-name">Cat Name</FormLabel>
                <Input
                  id="cat-name"
                  name="name"
                  placeholder="Super Cat"
                  bg="white"
                  size="lg"
                  onChange={handleChange}
                  value={cat.name}
                />
                <FormErrorMessage>{formValidation.name}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="cat-description">Description</FormLabel>
                <Input
                  id="cat-description"
                  name="description"
                  placeholder="Notes about the Cat"
                  bg="white"
                  size="lg"
                  onChange={handleChange}
                  value={cat.description}
                />
              </FormControl>

              <FormControl
                isRequired
                isInvalid={formValidation.breed !== undefined}
              >
                <FormLabel htmlFor="cat-breed">Breed</FormLabel>
                <Input
                  id="cat-breed"
                  name="breed"
                  placeholder="Angora"
                  bg="white"
                  size="lg"
                  onChange={handleChange}
                  value={cat.breed}
                />
                <FormErrorMessage>{formValidation.breed}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="cat-birth">Birthdate</FormLabel>
                <Input
                  id="cat-birth"
                  name="birthdate"
                  type="date"
                  bg="white"
                  size="lg"
                  onChange={handleChange}
                  value={cat.birthdate ? cat.birthdate?.toString() : ""}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" onClick={handleSaveButtonClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCatDialog;
