import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ImClock } from "react-icons/im";
import { AlertIcomCompoment } from "../imputs/alertIcom";
import { AndamentoIconComponent } from "../imputs/andamentoIcon";
import { DistratoIconComponent } from "../imputs/distratoIcom";
import { EditarIconComponent } from "../imputs/editarIcom";
import { NowIconComponent } from "../imputs/nowIcon";
import { DeletarIconComponent } from "../imputs/removeIcom";
import { calcTimeOut } from "../script/calcTimeOut";

interface CardComponentHomeProps {
  dados: solictacao.SolicitacaoObjectType;
  session: SessionNext.Server | any | null;
}

export const CardComponentHome = ({
  dados,
  session,
}: CardComponentHomeProps) => {
  const Gbcolor = dados.distrato
    ? "gray.600"
    : !dados.ativo
    ? "red.500"
    : dados.alertanow
    ? "yellow.400"
    : dados.andamento === "APROVADO"
    ? "green.200"
    : dados.andamento === "EMITIDO"
    ? "green.200"
    : "white";

  const Textcolor = dados.distrato ? "white" : !dados.ativo ? "white" : "black";

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
      <Card
        direction={"row"}
        overflow="hidden"
        variant="outline"
        size={"sm"}
        bg={Gbcolor}
        rounded={"xl"}
      >
        <Stack>
          <CardBody>
            <Heading color={Textcolor} size="xs">
              {dados.id} - {dados.nome}
            </Heading>
            <Flex
              py="2"
              w="full"
              fontSize={"xs"}
              color={Textcolor}
              gap={3}
              wrap={"wrap"}
            >
              {agendamento && <Text>Agendamento: {agendamento}</Text>}
              {dados.andamento && <Text>Andamento: {dados.andamento}</Text>}
              {timeOut && (
                <Flex gap={1} alignItems={"center"}>
                  <ImClock />
                  <Text>: {timeOut}</Text>
                </Flex>
              )}
            </Flex>
          </CardBody>
          <CardFooter pt={0}>
            <Flex gap={2}>
              <AlertIcomCompoment tag={dados.alerts} />
              <AndamentoIconComponent andamento={false} />
              <NowIconComponent now={dados.alertanow} />
              <EditarIconComponent aria-label="Editar solicitação" />

              <DeletarIconComponent
                aria-label="Deletar solicitação"
                _hover={{ bg: "red.300", color: "white", border: "none" }}
                Block={dados.ativo}
                andamento={dados.andamento}
              />
              <DistratoIconComponent
                aria-label="Distrato solicitação"
                distrato={!dados.ativo ? true : dados.distrato}
                andamento={dados.andamento}
              />
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};
