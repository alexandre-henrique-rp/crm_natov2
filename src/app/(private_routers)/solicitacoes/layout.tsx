import { Box } from "@chakra-ui/react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "SOLICITAÇÕES",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Box overflowY={"auto"} h={"100dvh"} w={"100vw"}>
      {children}
    </Box>
  );
}
