import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AppContainer from "../AppContainer";
import { catsState } from "../AppState";
import { CatCard } from "../components";

const HomeView = (props: {}) => {
  const navigate = useNavigate();
  const allCats = useRecoilValue(catsState);

  useEffect(() => {
    document.title = "My Cats";
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
            <Wrap spacing={8} justify="space-between" alignItems="center">
              {allCats.map((c, i) => (
                <WrapItem
                  cursor="pointer"
                  onClick={() => navigate(`/cats/${c.id}`)}
                >
                  <CatCard cat={c} key={`cat-${i}`} />
                </WrapItem>
              ))}
            </Wrap>
          </Container>
        </Grid>
      </AppContainer>
    </>
  );
};

export default HomeView;
