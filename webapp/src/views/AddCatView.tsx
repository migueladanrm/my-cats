import {
  Avatar,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCat } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import AppContainer from "../AppContainer";

const AddCatView = (props: {}) => {
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
                colorScheme="teal"
                icon={<Icon color="gray.50" as={FaCat} h={16} w={16} />}
                p={8}
                size="2xl"
                boxShadow="md"
              />
              <Button
                colorScheme="teal"
                variant="solid"
                leftIcon={<Icon as={MdAddPhotoAlternate} />}
                mt={4}
              >
                Find Image...
              </Button>
            </Flex>

            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="cat-name">Cat Name</FormLabel>
                <Input id="cat-name" placeholder="Super Cat" bg="white"/>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="cat-description">Description</FormLabel>
                <Input id="cat-description" placeholder="Notes about the Cat" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="cat-breed">Breed</FormLabel>
                <Select id="cat-breed" placeholder="Cat Breed">
                  <option>Absinio</option>
                  <option>British Shorthair</option>
                </Select>
              </FormControl>
            </VStack>
          </Flex>
        </Container>

        <Grid justifyContent="center" mt={4} p={4}>
          <Button colorScheme="pink" variant="solid" size="lg">
            Add
          </Button>
        </Grid>
      </Grid>
    </AppContainer>
  );
};
export default AddCatView;
