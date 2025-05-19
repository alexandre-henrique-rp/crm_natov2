import { Flex, Td, Tr } from "@chakra-ui/react";
import { AlertIcomCompoment } from "../imputs/alertIcom";
import { AndamentoIconComponent } from "../imputs/andamentoIcon";
import { NowIconComponent } from "../imputs/nowIcon";
import { EditarIconComponent } from "../imputs/editarIcom";
import { DeletarIconComponent } from "../imputs/removeIcom";
import { DistratoIconComponent } from "../imputs/distratoIcom";
import { calcTimeOut } from "../script/calcTimeOut";


interface TableComponentProps {
  dados: solictacao.SolicitacaoObjectType;
  session: SessionNext.Server | any | null;
}

export const TableComponent = ({ dados, session }: TableComponentProps) => {
  const Gbcolor = dados.distrato
    ? "gray.600"
    : !dados.ativo
    ? "red.500"
    : dados.alertanow
    ? "yellow.400"
    : "transparent";

  const Textcolor = dados.distrato
    ? "white"
    : !dados.ativo
    ? "white"
    : "black";
    
  const agendamento =
    dados.dt_agendamento && dados.hr_agendamento
      ? dados.dt_agendamento.split("T")[0].split("-").reverse().join("/") +
        " " +
        dados.hr_agendamento.split("T")[1].split(".")[0]
      : "";

  const timeOut = calcTimeOut(
    dados.createdAt,
    dados.dt_aprovacao || null,
    dados.hr_aprovacao || null
  );
  return (
    <>
      <Tr bg={Gbcolor}>
        <Td>
          <Flex gap={2}>
            <AlertIcomCompoment tag={dados.alerts} />
            <AndamentoIconComponent andamento={false} />
            <NowIconComponent now={dados.alertanow} />
            <EditarIconComponent aria-label="Editar solicitação" />

            <DeletarIconComponent
              aria-label="Deletar solicitação"
              _hover={{ bg: "red.300", color: "white", border: "none" }}
              Block={dados.ativo}
            />
            <DistratoIconComponent
              aria-label="Distrato solicitação"
              distrato={!dados.ativo ? true : dados.distrato}
            />
          </Flex>
        </Td>
        <Td color={Textcolor}>{dados.id}</Td>
        <Td color={Textcolor}>{dados.nome}</Td>
        <Td color={Textcolor}>{agendamento}</Td>
        <Td color={Textcolor}>{dados.andamento}</Td>
        <Td color={Textcolor}>{timeOut}</Td>
        {session?.user?.hierarquia === "ADM" && <Td color={Textcolor}>{dados.construtora.fantasia}</Td>}
      </Tr>
    </>
  );
};
