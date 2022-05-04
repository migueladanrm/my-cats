import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCat } from "react-icons/fa";
import { ProfilePictureDialog } from "../components";
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

  const selectImageDialog = useDisclosure();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCat({ ...cat, [name]: value });
  };

  const handleImageUrlChange = (imageUrl: string) => {
    setCat({ ...cat, profilePicture: imageUrl });
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
                    icon={<Icon color="gray.50" as={FaCat} h={16} w={16} />}
                    p={cat.profilePicture ? 0 : 8}
                    size="2xl"
                    boxShadow="md"
                    src={cat.profilePicture}
                  />
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    mt={4}
                    onClick={selectImageDialog.onOpen}
                    boxShadow="base"
                  >
                    Change Image...
                  </Button>
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

      <ProfilePictureDialog
        imageUrl={cat.profilePicture}
        isOpen={selectImageDialog.isOpen}
        onClose={selectImageDialog.onClose}
        onImageUrlChange={handleImageUrlChange}
      />
    </>
  );
};

export default EditCatDialog;
