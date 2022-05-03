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
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import { FaCat } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import AppContainer from "../AppContainer";
import { catsState } from "../AppState";
import { useSpinner } from "../hooks";
import { Cat } from "../models";
import { CatsService } from "../services";
import { BaseCatValidator } from "../validators";

const AddCatView = (props: {}) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<any>();
  const navigate = useNavigate();

  const onSelectProfilePictureButtonClick = () => {
    inputFile.current?.click();
  };

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
                p={8}
                size="2xl"
                boxShadow="md"
                // src={inputFile?.current?.files[0]}
              />
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
              />

              <Button
                colorScheme="teal"
                variant="solid"
                leftIcon={<Icon as={MdAddPhotoAlternate} />}
                mt={4}
                onClick={onSelectProfilePictureButtonClick}
                boxShadow="base"
              >
                Find Image...
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
    </AppContainer>
  );
};
export default AddCatView;
