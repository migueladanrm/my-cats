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
} from "@chakra-ui/react";
import { FaCat } from "react-icons/fa";
import { MdAddPhotoAlternate} from "react-icons/md";
import AppContainer from "../AppContainer";

const AddCatView = (props: {}) => {
  return (
    <AppContainer>
      <Grid>
        <Container>
          <Text fontSize="4xl" fontWeight={600}>
            Add Cat
          </Text>
          <Flex direction="column">
            <Flex justifyContent="center" direction="column">
              <Grid justifyContent="center" w="1">
                <Avatar
                  icon={<Icon color="gray.50" as={FaCat} h={32} w={32} />}
                  p={8}
                  size="full"
                />
              </Grid>
              <Button colorScheme="green" variant="solid"
              leftIcon={<Icon as={MdAddPhotoAlternate} />}>
                Find Image...
              </Button>
            </Flex>
            <FormControl isRequired>
              <FormLabel htmlFor="cat-name">Cat Name</FormLabel>
              <Input id="cat-name" placeholder="Super Cat" />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel htmlFor="cat-breed">Breed</FormLabel>
            <Select id="cat-breed" placeholder="Cat Breed">
              <option>Absinio</option>
              <option>British Shorthair</option>
            </Select>
          </FormControl>
        </Container>

        <Grid justifyContent="center" mt={4} p={4}>
          <Button colorScheme="cyan" variant="solid" size="lg">
            Add
          </Button>
        </Grid>
      </Grid>
    </AppContainer>
  );
};
export default AddCatView;
