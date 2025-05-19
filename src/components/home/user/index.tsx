import { SessionServer } from "@/types/session";
import { Flex } from "@chakra-ui/react";

interface UserCompomentInfoProps {
  session: SessionServer | null;
}

export const UserCompomentInfo = ({ session }: UserCompomentInfoProps) => {
  return (
    <>
      {session && (
        <Flex
          display={{ base: "none", md: "flex" }}
          w={"20%"}
          minH={"100%"}
          bg="#d81010"
        >
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </Flex>
      )}
    </>
  );
};