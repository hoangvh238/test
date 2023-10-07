import { Box } from "@chakra-ui/react";

import { Community } from "../../atoms/CommunitiesAtom";


type Props = {
  chatUsers: Community[];
};

function ConversationsList({ chatUsers }: Props) {
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      position="relative"
      height="100%"
      overflow="scroll"
    >
     
    </Box>
  );
}

export default ConversationsList;
