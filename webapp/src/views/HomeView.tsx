import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Icon,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaCat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import AppContainer from "../AppContainer";
import { catsState } from "../AppState";
import { CatCard } from "../components";
import { Cat } from "../models";
import { CatsService } from "../services";

const HomeView = (props: {}) => {
  const navigate = useNavigate();
  const [cats, setCats] = useRecoilState(catsState);

  useEffect(() => {
    document.title = "My Cats";

    CatsService.get()
      .then((result) => setCats(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <AppContainer>
        <Grid h="100%">
          <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="4xl" fontWeight={600} py={4}>
                My Cats
              </Text>
              <Stack direction="row" spacing={4}>
                <Link to="/add-cat">
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="pink"
                    variant="solid"
                  >
                    Add Cat
                  </Button>
                </Link>
              </Stack>
            </Flex>
            {0 < cats.length ? (
              <Wrap spacing={8} justify="space-between" alignItems="center">
                {cats.map((c, i) => (
                  <WrapItem
                    cursor="pointer"
                    onClick={() => navigate(`/cats/${c.id}`)}
                    key={`cat-wrap-item-${i}`}
                  >
                    <CatCard cat={c as Cat} key={`cat-card-${i}`} />
                  </WrapItem>
                ))}
              </Wrap>
            ) : (
              <VStack mt={4} spacing={8} userSelect="none">
                <Icon color="gray.500" as={FaCat} h={32} w={32} />
                <VStack>
                  <Text
                    color="gray.500"
                    fontSize="3xl"
                    fontWeight={600}
                    letterSpacing="1px"
                  >
                    No Cats Found
                  </Text>
                  <Text color="gray.500" fontSize="lg">
                    Click on "+ Add Cat" to start.
                  </Text>
                </VStack>
              </VStack>
            )}
          </Container>
        </Grid>
      </AppContainer>
    </>
  );
};

export default HomeView;
