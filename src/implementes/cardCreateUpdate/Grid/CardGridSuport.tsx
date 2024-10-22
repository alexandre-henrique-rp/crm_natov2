import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import CreateSuportAlert from "@/components/botoes/btn_create_suporte";


interface CardGridSuportProps extends BoxProps {
  ID?: number;
}

export async function CardGridSuport({
  ID,
}: CardGridSuportProps) {
  const session = await getServerSession(auth);
  return (
    <>
      {session?.user?.hierarquia === "ADM" && (
        <Box>
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Anexar ou Editar Suporte 
          </FormLabel>
          <CreateSuportAlert id={ID ?? 0}/>
        </Box>
      )}
    </>
  );
}
