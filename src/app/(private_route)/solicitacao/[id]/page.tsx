"use client";
import FormSolicitacaoEdit from "@/components/form/solicitacao/edit";
import { Flex } from "@chakra-ui/react";

interface Props {
  params: {
    id: string;
  };
}

export default function PageSolicitacoes({ params }: Props) {
  const { id } = params;
  return (
    <>
      <Flex>
        <FormSolicitacaoEdit id={+id} />
      </Flex>
    </>
  );
}
