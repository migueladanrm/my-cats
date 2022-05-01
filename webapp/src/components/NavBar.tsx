import {
  Grid,
  Container,
  Flex,
  Divider,
  Text,
  Box,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionState } from "../AppState";

const NavBar = () => {
  return (
    <Grid flexDirection="row" background="cyan.700" boxShadow="base">
      <Container
        maxW="container.xl"
        fontSize="16px"
        opacity={0.75}
        _hover={{ opacity: 1 }}
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          h="100%"
          alignItems="center"
        >
          <Flex alignItems="center" alignSelf="center" flexDirection="row">
            <Link to="/">
              <Flex
                alignItems="center"
                alignSelf="center"
                flexDirection="row"
                userSelect="none"
                fontSize="20px"
              >
                <Text color="gray.200">my</Text>
                <Text color="gray.50" fontWeight={600}>
                  cats
                </Text>
              </Flex>
            </Link>
          </Flex>
          <UserCard />
        </Flex>
      </Container>
    </Grid>
  );
};

function UserCard(props: {}) {
  const [session] = useRecoilState(sessionState);
  const navigate = useNavigate();
  const onClick = () => {
    if (!session) {
      navigate("/auth/login");
    }
  };

  return (
    <Box
      borderRadius={8}
      px={2}
      py={2}
      _hover={{ bg: "cyan.600" }}
      onClick={onClick}
    >
      <Flex direction="row">
        {session?.user && (
          <Flex>
            <Text color="whitesmoke" alignSelf="center" userSelect="none">{`${
              session?.user.displayName ?? session?.user.userName ?? "Login"
            }`}</Text>
            <Avatar
              ml={4}
              name={`${session?.user.displayName ?? session?.user.userName}`}
              size="xs"
              colorScheme="teal"
            />
          </Flex>
        )}
        {!session?.user && (
          <Flex userSelect="none">
            <Text color="whitesmoke">Login</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default NavBar;
