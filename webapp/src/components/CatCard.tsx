import {
  Avatar,
  AvatarBadge,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Cat } from "../models";
import moment from "moment";

const CatCard = (props: { cat: Cat }) => {
  const { cat } = props;
  return (
    <Box
      w="xs"
      borderWidth="0px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      _hover={{ bg: "white", boxShadow: "base" }}
    >
      <Avatar size="full" src={cat?.profilePicture} boxShadow="md">
        <AvatarBadge boxSize="10em" bg="green.500" mb={4} mr={4} />
      </Avatar>

      <VStack mt={4}>
        <Text fontSize="3xl" fontWeight={600}>
          {cat.name}
        </Text>
        {cat.lastSeen !== undefined && (
          <Text color="gray" fontSize="lg" fontStyle="italic">
            {moment(cat.lastSeen).toNow()}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default CatCard;
