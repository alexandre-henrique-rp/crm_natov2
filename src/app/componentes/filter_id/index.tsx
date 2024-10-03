import { Input, InputLeftAddon } from "@chakra-ui/react";

interface FiltroIdProps {
  id: string;
}

export default function FiltroId({ id}: FiltroIdProps){
  return (
  <>
  <InputLeftAddon>+234</InputLeftAddon>
  <Input
    placeholder="Filtrar por ID"
    value={id}
    width=""
    variant='outline'
    mr={4}
  />
  </>
  );
};
