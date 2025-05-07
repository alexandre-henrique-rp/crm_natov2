
import UserCompraProvider from "@/provider/UserCompra";
import { Alert, AlertIcon, Box, Button, Divider, Flex, FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import { UpdateSolicitacao } from "@/actions/solicitacao/service/update";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import { ResendSms } from "@/implementes/cardCreateUpdate/butons/resendSms";
import { AuthUser } from "@/types/session";
import { BtCreateAlertCliente } from "../botoes/bt_create_alert_cliente";
import CreateChamado from "../botoes/btn_chamado";
import BtnIniciarAtendimento from "../botoes/btn_iniciar_atendimento";
import BotaoReativarSolicitacao from "../botoes/btn_reativar_solicitacao";
import { CriarFcweb } from "../botoes/criarFcweb";
import BtnAlertNow from "../btn_alerta_now";
import DistratoAlertPrint from "../Distrato_alert_print";
import BotaoPausar from "../botoes/btn_pausar";
import PatchButton from "../botoes/sendbt";


type Props = {
  setDadosCard: solictacao.SolicitacaoGetType;
  user: AuthUser;
};


export function CardUpdateDireto({ setDadosCard, user }: Props) {
  const HierarquiaUser = user?.hierarquia;
  const readonly = HierarquiaUser === "ADM" ? false : true;
  const { construtora } = setDadosCard;
  // não essta recebendo o financeira
  setDadosCard.financeiro = 1

  const body = {
    nome: setDadosCard.nome,
    cpf: setDadosCard.cpf,
    telefone: setDadosCard.telefone,
    email: setDadosCard.email,
    dt_nascimento:
      typeof setDadosCard.dt_nascimento === "string"
        ? setDadosCard.dt_nascimento
        : new Date(setDadosCard.dt_nascimento)
          .toISOString()
          .split("T")[0],
    financeiro: setDadosCard.financeiro.id,
    pixCopiaECola: setDadosCard.pixCopiaECola,
    qrcode: setDadosCard.qrcode,
    txid: setDadosCard.txid,
    valorcd: setDadosCard.valorcd,
    imagemQrcode: setDadosCard.imagemQrcode,
    status_pgto: setDadosCard.status_pgto,
  }


  console.log(body)
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
                <input
                  type="text"
                  hidden
                  value={setDadosCard.ativo.toString()}
                  readOnly
                  name="StatusAtivo"
                />
                <CardCreateUpdate.GridName
                  Nome={setDadosCard.nome}
                  readonly={readonly}
                  w={{ base: "100%", md: "33rem" }}
                />
                <CardCreateUpdate.GridDateNasc
                  DataSolicitacao={setDadosCard}
                  w={{ base: "100%", md: "10rem" }}
                  readonly={readonly}
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

                <CardCreateUpdate.GridTel
                  index={1}
                  DataSolicitacao={setDadosCard.telefone}
                  w={{ base: "100%", md: "10rem" }}
                  readonly={readonly}
                />
                <CardCreateUpdate.GridEmail
                  email={setDadosCard.email}
                  type="register"
                  readonly={readonly}
                  w={{ base: "100%", md: "25rem" }}
                />

                <CardCreateUpdate.GridTel
                  index={2}
                  DataSolicitacao={setDadosCard.telefone2}
                  w={{ base: "100%", md: "10rem" }}
                  readonly={readonly}
                />
                {construtora && (
                  <CardCreateUpdate.GridConstrutora
                    user={user}
                    DataSolicitacao={setDadosCard}
                    w={{ base: "100%", md: "12rem" }}
                  />
                )}
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
              </Flex>
              <Box px={4} mt={6}>
                {/* Cabeçalho opcional para a seção */}
                <FormLabel fontSize="sm" fontWeight="md" mb={2}>
                  Detalhes de Pagamento
                </FormLabel>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  gap={4}
                >
                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.600">
                      Pix Copia & Cola
                    </FormLabel>
                    <Input
                      name="pixCopiaECola"
                      value={setDadosCard.pixCopiaECola}
                      isReadOnly={readonly}
                      size="sm"
                      bg="gray.100"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.600">
                      QR Code
                    </FormLabel>
                    <Input
                      name="qrcode"
                      value={setDadosCard.qrcode}
                      isReadOnly={readonly}
                      size="sm"
                      bg="gray.100"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.600">
                      TXID
                    </FormLabel>
                    <Input
                      name="txid"
                      value={setDadosCard.txid}
                      isReadOnly={readonly}
                      size="sm"
                      bg="gray.100"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.600">
                      Valor (R$)
                    </FormLabel>
                    <Input
                      name="valorcd"
                      type="number"
                      value={String(setDadosCard.valorcd)}
                      isReadOnly={readonly}
                      size="sm"
                      bg="gray.100"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="xs" color="gray.600">
                      Status Pagamento
                    </FormLabel>
                    <Input
                      name="status_pgto"
                      value={setDadosCard.status_pgto}
                      isReadOnly={readonly}
                      size="sm"
                      bg="gray.100"
                    />
                  </FormControl>
                </Grid>
              </Box>
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
                  suspenso={setDadosCard.docSuspenso}
                  Url={setDadosCard.uploadCnh}
                  w={{ base: "100%", md: "19rem" }}
                  Hierarquia={!HierarquiaUser ? "USER" : HierarquiaUser}
                />
                <CardCreateUpdate.GridUpdateDocument
                  tag="RG"
                  suspenso={setDadosCard.docSuspenso}
                  Url={setDadosCard.uploadRg}
                  w={{ base: "100%", md: "19rem" }}
                  Hierarquia={!HierarquiaUser ? "USER" : HierarquiaUser}
                />
              </Flex>
              {construtora?.id === 5 && (
                <Box>
                  <Alert
                    justifyContent="space-between"
                    status="warning"
                    variant="left-accent"
                  >
                    <AlertIcon />
                    Apenas para clientes presentes no Plantão de Venda.
                    <BtnAlertNow
                      id={setDadosCard.id}
                      andamento={setDadosCard.andamento}
                      ativo={setDadosCard.ativo}
                      distrato={setDadosCard.distrato}
                      construtora={setDadosCard.construtora}
                      alertanow={setDadosCard.alertanow}
                    />
                  </Alert>
                </Box>
              )}
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
            wrap={"wrap"}
          >
            {setDadosCard.distrato && setDadosCard.ativo && (
              <CardCreateUpdate.GridDistrato Id={setDadosCard.id} User={user} />
            )}
            {!setDadosCard.id_fcw && setDadosCard.ativo && (
              <CriarFcweb Id={setDadosCard.id} user={user} />
            )}
            {setDadosCard.ativo && (
              <BtCreateAlertCliente
                DataSolicitacao={setDadosCard}
                user={user}
              />
            )}
            {setDadosCard.ativo && HierarquiaUser === "ADM" && (
              <ResendSms id={setDadosCard.id} />
            )}
            <CreateChamado id={setDadosCard.id} />
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={3}
            px={4}
            py={3}
            wrap={"wrap"}
          >

            <BotaoPausar
              id={setDadosCard.id}
              statusPause={setDadosCard.pause}
            />

            <BtnIniciarAtendimento
              hierarquia={HierarquiaUser}
              status={setDadosCard.statusAtendimento}
              aprovacao={setDadosCard.andamento}
              id={setDadosCard.id}
            />
            <PatchButton body={body} />

            {!setDadosCard.ativo && HierarquiaUser === "ADM" ? (
              <BotaoReativarSolicitacao id={setDadosCard.id} />
            ) : (
              <Box hidden></Box>
            )}
          </Flex>
        </CardCreateUpdate.Form>
      </CardCreateUpdate.Root>
    </>
  );
}
