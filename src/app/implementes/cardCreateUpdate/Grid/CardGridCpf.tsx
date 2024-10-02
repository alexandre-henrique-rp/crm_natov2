import { Box, BoxProps, FormLabel, Input, Text } from "@chakra-ui/react";
import InputCpf from "../imputs/inputCpf";

interface CardGridCpfProps extends BoxProps {
  CPF?: string;
  idUser?: number;
}


export default async function CardGridCpf({idUser, CPF, ...props }: CardGridCpfProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          CPF
        </FormLabel>
        {CPF && (
          <><Text px={1} py={2} textColor={"GrayText"} bg={"gray.100"} borderBottom={"1px solid #A0AEC0"}>
            {CPF}
          </Text>
          <InputCpf hidden
              variant="flushed"
              setValueCpf={CPF}
              px={1}
              bg={"gray.100"}
              borderColor={"gray.400"} /></>
        )}
        {!CPF && (
          <InputCpf
            variant="flushed"
            setValueCpf={CPF}
            px={1}
            bg={"gray.100"}
            borderColor={"gray.400"}
          />
        )}
      </Box>
      <Box hidden>
        <Input name="id" value={idUser} />
      </Box>
      
    </>
  );
}