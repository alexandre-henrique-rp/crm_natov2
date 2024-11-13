import BotaoJuncao from "@/components/botoes/bt_juncao";
import FooterComponent from "@/components/footer";
import { auth } from "@/lib/auth_confg";
import { Box, Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(auth);
  if (session) {
    try {
      const request = await fetch(`${process.env.MONITOR_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: session.token })
      });
      const data = await request.json();
      console.log("🚀 ~ PrivateLayout ~ data:", data);
      console.log("🚀 ~ data:", request);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      justifyContent={"space-between"}
      flexDir={"column"}
    >
      <BotaoJuncao />
      <Box h={"90vh"} overflowY={"auto"}>
        {children}
      </Box>
      <FooterComponent />
    </Flex>
  );
}
