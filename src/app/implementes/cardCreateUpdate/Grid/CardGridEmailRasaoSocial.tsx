import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import React from "react";
import InputEmailRazaoSocial from "../imputs/inputEmailRazaoSocial";

interface CardGridEmailRazaoSocialProps extends BoxProps {
  DataSolicitacao?: solictacao.SolicitacaoGetType;
  type?: string;
}

export default function CardGridEmailRazaoSocial({
  DataSolicitacao,
  type,
  ...props
}: CardGridEmailRazaoSocialProps): JSX.Element {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          {type === "confirm" ? "Confirmar Email" : "Email"}
        </FormLabel>
        <InputEmailRazaoSocial
          setValueEmail={DataSolicitacao?.email}
          name={type === "confirm" ? "confirmEmail" : "email"}
          variant="flushed"
          px={1}
          bg={"gray.100"}
          borderColor={"gray.400"}
        />
      </Box>
    </>
  );
}
