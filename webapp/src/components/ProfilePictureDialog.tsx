import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";

const ProfilePictureDialog = (props: {
  imageUrl?: string;
  isOpen: boolean;
  onClose: () => void;
  onImageUrlChange: (imageUrl: string) => void;
}) => {
  const [imageUrl, setImageUrl] = useState("");

  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleUploadButtonClick = () => {
    props.onImageUrlChange(imageUrl);
    props.onClose();
  };

  useEffect(() => {
    setImageUrl(
      props.imageUrl && 0 < props.imageUrl.length ? props.imageUrl : ""
    );
  }, [props.isOpen]);

  return (
    <Modal isCentered isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Cat Profile Picture</ModalHeader>
        <ModalCloseButton />
        <VStack>
          {imageUrl && 0 < imageUrl.length ? (
            <Box boxSize="sm">
              <Image src={imageUrl} />
            </Box>
          ) : (
            <Box boxSize="sm" as={Flex} justifyContent="center">
              <VStack alignSelf="center">
                <span>
                  <Icon
                    color="gray.500"
                    as={MdAddPhotoAlternate}
                    h={32}
                    w={32}
                  />
                </span>
                <Text color="gray.500" fontSize="lg">
                  Enter a Picture URL in the bellow input.
                </Text>
              </VStack>
            </Box>
          )}
          <FormControl p={6}>
            <FormLabel htmlFor="image-url">Image URL</FormLabel>
            <Input
              id="imageUrl"
              name="name"
              placeholder="http://my-storage.example/some-picture.jpg"
              bg="white"
              size="lg"
              onChange={handleChange}
              value={imageUrl}
            />
            <FormErrorMessage>Hello</FormErrorMessage>
          </FormControl>
        </VStack>
        <ModalFooter>
          <Button colorScheme="pink" onClick={handleUploadButtonClick}>
            Set Profile Picture
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePictureDialog;
