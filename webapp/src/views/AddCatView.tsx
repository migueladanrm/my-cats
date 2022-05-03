import {
  Avatar,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Icon,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ChangeEvent, useState } from "react";
import { FaCat } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import AppContainer from "../AppContainer";
import { catsState } from "../AppState";
import { FileUploaderDialog } from "../components";
import { useSpinner } from "../hooks";
import { Cat } from "../models";
import { CatsService } from "../services";
import { BaseCatValidator } from "../validators";

const AddCatView = (props: {}) => {
  const navigate = useNavigate();

  const selectImageDialog = useDisclosure();

  const [allCats, setAllCats] = useRecoilState(catsState);
  const [cat, setCat] = useState<Cat>({
    name: "",
    breed: "",
    description: "",
    profilePicture: "",
    birthdate: new Date(),
  });
  const [formValidation, setFormValidation] = useState<ValidationErrors<Cat>>(
    {}
  );

  const spinner = useSpinner();

  const addCat = (cat: Cat) => {
    spinner.show(true);
    CatsService.add(cat)
      .then((createdCat) => {
        setAllCats(allCats.concat(createdCat));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => spinner.show(false));
  };

  const handleAddButtonClick = () => {
    const validation = new BaseCatValidator().validate(cat);
    if (0 < Object.keys(validation).length) {
      setFormValidation(validation);
      return;
    }

    addCat(cat);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCat({ ...cat, [name]: value });
  };

  const handleImageUrlChange = (imageUrl: string) => {
    setCat({ ...cat, profilePicture: imageUrl });
  };

  return (
    <AppContainer>
      <Grid>
        <Container maxW="container.lg">
          <Text fontSize="4xl" fontWeight={600}>
            Add Cat
          </Text>
          <Flex direction="column" mt={4}>
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
                leftIcon={<Icon as={MdAddPhotoAlternate} />}
                mt={4}
                onClick={selectImageDialog.onOpen}
                boxShadow="base"
              >
                Change Image...
              </Button>
            </Flex>

            <VStack spacing={4}>
              <FormControl
                isRequired
                isInvalid={formValidation.name !== undefined}
              >
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
                <Input id="cat-birth" type="date" bg="white" size="lg" />
              </FormControl>
            </VStack>
          </Flex>
        </Container>

        <Grid justifyContent="center" mt={4} p={4}>
          <Button
            colorScheme="pink"
            variant="solid"
            size="lg"
            onClick={handleAddButtonClick}
            boxShadow="base"
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <FileUploaderDialog
        imageUrl={cat.profilePicture}
        isOpen={selectImageDialog.isOpen}
        onClose={selectImageDialog.onClose}
        onImageUrlChange={handleImageUrlChange}
      />
    </AppContainer>
  );
};
export default AddCatView;
