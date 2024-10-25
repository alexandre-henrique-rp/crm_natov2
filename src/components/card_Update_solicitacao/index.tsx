import { Alert, AlertIcon, Box, Divider, Flex, Input } from "@chakra-ui/react";
import UserCompraProvider from "@/provider/UserCompra";

import { ResendSms } from "@/implementes/cardCreateUpdate/butons/resendSms";
import { CriarFcweb } from "../botoes/criarFcweb";
import { BtCreateAlertCliente } from "../botoes/bt_create_alert_cliente";
import { SaveBtm } from "@/implementes/cardCreateUpdate/butons/saveBtm";
import DistratoAlertPrint from "../Distrato_alert_print";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import { UpdateSolicitacao } from "@/actions/solicitacao/service/update";
import { SessionUserType } from "@/types/next-auth";

// const prisma = new PrismaClient();
type Props = {
  setDadosCard: solictacao.SolicitacaoGetType;
  user: SessionUserType.User;
};
export async function CardUpdateSolicitacao({ setDadosCard, user }: Props) {
  const HierarquiaUser = user?.hierarquia;
  return (
    <>
      <CardCreateUpdate.Root>
        <CardCreateUpdate.Headers SetDados={setDadosCard} />
        <Divider borderColor="#00713D" my={4} />
        <CardCreateUpdate.Form action={UpdateSolicitacao}>
          <UserCompraProvider>
            <Box hidden>
              <Input value={setDadosCard.id} name="id_cliente" readOnly />
              <Input
                value={setDadosCard.ativo.toString()}
                name="ativo"
                readOnly
              />
            </Box>
            <Flex flexDir={"column"} gap={6} w={"100%"} h={"100%"} py={10}>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={5}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridCpf
                  CPF={setDadosCard?.cpf}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridName
                  Nome={setDadosCard.nome}
                  w={{ base: "100%", md: "33rem" }}
                />
                <CardCreateUpdate.GridDateNasc
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridRelacionamento
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "13rem" }}
                />
              </Flex>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={4}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridEmail
                  type="register"
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "25rem" }}
                />
                <CardCreateUpdate.GridTel
                  index={1}
                  DataSolicitacao={setDadosCard.telefone}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridTel
                  index={2}
                  DataSolicitacao={setDadosCard.telefone2}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridConstrutora
                  user={user}
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "12rem" }}
                />
              </Flex>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                flexWrap={{ base: "nowrap", md: "wrap" }}
                gap={10}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridEmpreedimentoCL
                  user={user}
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridFinanceiraCl
                  user={user}
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridCorretor
                  user={user}
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridProtocolo
                  user={user}
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridStatus
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                />
                <CardCreateUpdate.GridTagsAlert
                  user={user}
                  ID={setDadosCard.id}
                  w={{ base: "100%", md: "18rem" }}
                />
                <CardCreateUpdate.GridSuporte
                  user={user}
                  ID={setDadosCard.id}
                  w={{ base: "100%", md: "16rem" }}
                />
                <CardCreateUpdate.GridLink
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "16rem" }}
                  />
                  {/* <CardCreateUpdate.GridSuporte
                    user={user}
                    ID={setDadosCard.id}
                    w={{ base: "100%", md: "16rem" }}
                  /> */}
              </Flex>

              <Box>
                <Alert status="info" variant="left-accent">
                  <AlertIcon />
                  Os processos com CNH anexada terão prioridade no atendimento.
                </Alert>
              </Box>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={10}
                px={4}
                justifyContent={{ base: "center", md: "space-evenly" }}
              >
                <CardCreateUpdate.GridUpdateDocument
                  tag="CNH"
                  Url={setDadosCard.uploadCnh}
                  w={{ base: "100%", md: "19rem" }}
                  Hierarquia={!HierarquiaUser ? "USER" : HierarquiaUser}
                />
                <CardCreateUpdate.GridUpdateDocument
                  tag="RG"
                  Url={setDadosCard.uploadRg}
                  w={{ base: "100%", md: "19rem" }}
                  Hierarquia={!HierarquiaUser ? "USER" : HierarquiaUser}
                />
              </Flex>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={10}
                px={4}
                justifyContent={{ base: "center", md: "space-between" }}
              >
                <CardCreateUpdate.GridObs
                  DataSolicitacao={setDadosCard}
                  w={"100%"}
                />
              </Flex>
              <Flex w={"100%"}>
                {setDadosCard.distrato && setDadosCard.ativo && (
                  <DistratoAlertPrint
                    userId={setDadosCard.distrato_id}
                    userDateTime={setDadosCard.distrato_dt}
                  />
                )}
                {!setDadosCard.ativo && (
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    Solicitação excluída
                  </Alert>
                )}
              </Flex>
              <Flex>
                {setDadosCard.logDelete && (
                  <CardCreateUpdate.GridHistorico
                    user={user}
                    DataSolicitacao={setDadosCard}
                    w={"100%"}
                  />
                )}
              </Flex>
            </Flex>
          </UserCompraProvider>
          <Flex
            w={"100%"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={3}
            px={4}
          >
            {setDadosCard.distrato && setDadosCard.ativo && (
              <CardCreateUpdate.GridDistrato Id={setDadosCard.id} User={user} />
            )}
            {!setDadosCard.id_fcw && setDadosCard.ativo && (
              <CriarFcweb Id={setDadosCard.id} user={user} />
            )}
            {setDadosCard.ativo && (
              <BtCreateAlertCliente DataSolicitacao={setDadosCard} user={user} />
            )}
            {setDadosCard.ativo && <ResendSms id={setDadosCard.id} />}
            <SaveBtm colorScheme="green" type="submit">
              Salvar
            </SaveBtm>
          </Flex>
        </CardCreateUpdate.Form>
      </CardCreateUpdate.Root>
    </>
  );
}
