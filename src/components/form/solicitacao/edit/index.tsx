"use client";
import BtRemoverDistrato from "@/components/botoes/bt_Remover_Distrato";
import BtnIniciarAtendimento from "@/components/botoes/btn_iniciar_atendimento";
import BotaoPausar from "@/components/botoes/btn_pausar";
import BoxBasic from "@/components/box/link";
import BtnBasicSave from "@/components/buttons/save";
import InputBasic from "@/components/input/basic";
import InputFileUpload from "@/components/input/doc";
import MaskedInput from "@/components/input/masked";
import SelectBasic from "@/components/input/select-basic";
import SelectMultiItem from "@/components/input/select-multi-itens";
import { TagsOptions } from "@/data/tags";
import { useSession } from "@/hook/useSession";
import { ResendSms } from "@/implementes/cardCreateUpdate/butons/resendSms";
import { Box, Divider, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
interface FormSolicitacaoEditProps {
  id?: number;
  data: any;
}

export default function FormSolicitacaoEdit({
  id,
  data,
}: FormSolicitacaoEditProps) {
  const user = useSession();
  const hierarquia = user?.hierarquia ? user.hierarquia : null;
  const isAdmin = user?.hierarquia === "ADM";
  const [tagsOptions, setTagsOptions] = useState([] as any[]);
  const [Tags, setTags] = useState([] as any[]);
  const [form, setForm] = useState({
    id: null as number | null,
    nome: null as string | null,
    email: null as string | null,
    cpf: null as string | null,
    telefone: null as string | null,
    telefone2: null as string | null,
    dt_nascimento: null as string | null,
    id_fcw: null as number | null,
    obs: null as string | null,
    ativo: null as boolean | null,
    rela_quest: null as boolean | null,
    dt_distrato: null as Date | null,
    status_aprovacao: null as Boolean | null,
    distrato_id: null as number | null,
    andamento: null as string | null,
    type_validacao: null as string | null,
    dt_aprovacao: null as Date | null,
    ht_aprovacao: null as Date | null,
    dt_agendamento: null as Date | null,
    hr_agendamento: null as Date | null,
    estatos_pgto: null as string | null,
    valorcd: null as number | null,
    situacao_pgto: null as number | null,
    freqSms: null as number | null,
    alertanow: null as boolean | null,
    dt_criacao_now: null as Date | null,
    statusAtendimento: null as boolean | null,
    pause: null as boolean | null,
    createdAt: null as string | null,
    updatedAt: null as string | null,
    relacionamento: {
      id: null as number | null,
      nome: null as string | null,
    },
    dt_revogacao: null as Date | null,
    direto: null as boolean | null,
    txid: null as string | null,
    chamados: [
      {
        id: null as number | null,
        descricao: null as string | null,
      },
    ],
    construtora: {
      id: 0 as number,
      fantasia: "" as string,
    },
    empreendimento: {
      id: 0 as number,
      nome: "" as string,
    },
    financeira: {
      id: 0 as number,
      fantasia: "" as string,
    },
    corretor: {
      id: 0 as number,
      nome: "" as string,
    },
    uploadCnh: null as {} | null,
    uploadRg: null as {} | null,
    distrato: null as boolean | null,
  });
  const [options, setOptions] = useState([
    {
      id: null as number | null,
      fantasia: null as string | null,
      empreendimentos: [
        {
          id: null as number | null,
          nome: null as string | null,
        },
      ] as any[],
      financeiros: [
        {
          financeiro: {
            id: null as number | null,
            fantasia: null as string | null,
          },
        },
      ] as any[],
      colaboradores: [
        {
          id: null as number | null,
          nome: null as string | null,
        },
      ],
    },
  ]);
  const [empreendimentos, setEmpreendimentos] = useState([
    {
      id: 0 as number,
      nome: "" as string,
    },
  ]);
  const [financeiras, setFinanceiras] = useState([
    {
      id: null as number | null,
      fantasia: null as string | null,
    },
  ]);
  const [corretores, setCorretores] = useState([
    {
      id: null as number | null,
      nome: null as string | null,
    },
  ]);

  const session = useSession();

  useEffect(() => {
    if (session) {
      setForm(data);
      if (session.hierarquia === "ADM") {
        fetchADM();
        setTagsOptions(TagsOptions);
      }

      if (data.construtora?.id) {
        const construtoraSelecionada = options.find(
          (e) => e.id === Number(data.construtora.id)
        );

        if (construtoraSelecionada) {
          setEmpreendimentos(construtoraSelecionada.empreendimentos || []);
          setFinanceiras(
            construtoraSelecionada.financeiros.map((f: any) => f.financeiro) ||
              []
          );
          setCorretores(
            construtoraSelecionada.colaboradores.map((colab: any) => ({
              id: colab.user.id,
              nome: colab.user.nome,
            })) || []
          );
        }
      }
    }
  }, [session, id, data]);

  const fetchADM = async () => {
    const req = await fetch("/api/adm/getoptions");
    const data = await req.json();
    setOptions(data);
  };

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectConstrutora = (value: number) => {
    const construtoraSelecionada = options.find((e) => e.id === Number(value));

    if (construtoraSelecionada) {
      handleChange("construtora", {
        id: construtoraSelecionada.id,
        fantasia: construtoraSelecionada.fantasia,
      });
      setEmpreendimentos(construtoraSelecionada.empreendimentos || []);
      setFinanceiras(
        construtoraSelecionada.financeiros.map((f: any) => f.financeiro) || []
      );
      setCorretores(
        construtoraSelecionada.colaboradores.map((colab: any) => ({
          id: colab.user.id,
          nome: colab.user.nome,
        })) || []
      );
    } else {
      handleChange("construtora", { id: null, fantasia: "" });
      setEmpreendimentos([]);
      setFinanceiras([]);
      setCorretores([]);
    }

    handleChange("empreendimento", { id: null, nome: "" });
    handleChange("financeira", { id: null, fantasia: "" });
    handleChange("corretor", { id: null, nome: "" });
  };

  const handlesubmit = async () => {};

  const Msg =
    form.andamento !== "EMITIDO" &&
    form.andamento !== "APROVADO" &&
    form.dt_agendamento
      ? `Atendido em ${form.dt_agendamento} as ${form.hr_agendamento}`
      : !form.andamento
      ? ""
      : form.andamento;

  return (
    <Flex
      w={"100%"}
      rounded={"md"}
      border={"1px solid #E8E8E8"}
      alignItems={"center"}
      flexDir={{ base: "column", md: "column" }}
      flexWrap={{ base: "nowrap", md: "nowrap" }}
      gap={2}
      shadow={"lg"}
      h={"full"}
    >
      <Flex
        p={4}
        rounded={"md"}
        flexDir={"row"}
        justifyContent={"space-between"}
        w={"full"}
      >
        <Flex flexDir={"column"}>
          <Text fontSize={"md"}>
            Criado Em:
            {` ${
              form.createdAt &&
              form.createdAt.split("T")[0].split("-").reverse().join("/")
            }, ${form.createdAt && form.createdAt.split("T")[1].split(".")[0]}`}
          </Text>
          {form.updatedAt && (
            <Text fontSize={"md"}>
              Atualizado Em:
              {` ${
                form.updatedAt &&
                form.updatedAt.split("T")[0].split("-").reverse().join("/")
              }, ${
                form.updatedAt && form.updatedAt.split("T")[1].split(".")[0]
              }`}
            </Text>
          )}
          <Text fontSize={{ base: "sm", md: "md" }}>Id: {form.id}</Text>
        </Flex>
        <Flex flexDir={"column"}>
          <Text fontSize={{ base: "xl", md: "2xl" }}>Dados Pessoais</Text>
          <Text fontSize={{ base: "md", md: "md" }}>
            Corretor:{" "}
            {form.corretor?.nome
              ? form.corretor.nome
              : "Corretor Não Cadastrado"}
          </Text>
        </Flex>
      </Flex>
      <Divider borderColor="#00713D" />
      <Flex
        w={"100%"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={4}
        p={4}
        mb={2}
      >
        <Flex gap={2}>
          <MaskedInput
            boxWidth="40%"
            id="cpf"
            label="CPF"
            type="text"
            mask="999.999.999-99"
            value={form.cpf || ""}
            onvalue={(value) => handleChange("cpf", value)}
            required
          />
          <InputBasic
            id="nome"
            type="text"
            label="Nome"
            value={form.nome || ""}
            onvalue={(value) => handleChange("nome", value)}
            required
          />
          <InputBasic
            boxWidth="40%"
            id="dt_nascimento"
            type="date"
            label="Data de Nascimento"
            value={form.dt_nascimento ? form.dt_nascimento.split("T")[0] : ""}
            onvalue={(value) => handleChange("dt_nascimento", value)}
            required
          />
        </Flex>
        <Flex gap={2}>
          <InputBasic
            id="email"
            type="email"
            label="Email"
            value={form.email || ""}
            onvalue={(value) => handleChange("email", value)}
            required
          />
          <MaskedInput
            id="telefone"
            label="Whatsapp Com DDD"
            type="text"
            mask="(99) 99999-9999"
            value={form.telefone || ""}
            onvalue={(value) => handleChange("telefone", value)}
            required
            isWhatsapp
          />
          <MaskedInput
            id="telefone2"
            label="Whatsapp Com DDD 2"
            type="text"
            mask="(99) 99999-9999"
            value={form.telefone2 || ""}
            onvalue={(value) => handleChange("telefone2", value)}
            isWhatsapp
          />
        </Flex>
        <Flex gap={2}>
          <SelectBasic
            label="Construtora"
            id="construtora"
            onvalue={(value) => handleSelectConstrutora(value)}
            value={form.construtora ? form.construtora.id : ""}
            required
            options={options.map((construtora: any) => ({
              id: construtora.id,
              fantasia: construtora.fantasia,
            }))}
          />

          <SelectBasic
            label="Empreendimento"
            id="empreendimento"
            onvalue={(value) => {
              const empreendimentoSelecionado = empreendimentos.find(
                (e) => e.id === value
              );
              handleChange(
                "empreendimento",
                empreendimentoSelecionado ?? { id: null, nome: "" }
              );
            }}
            value={form.empreendimento ? form.empreendimento.id : ""}
            required
            isDisabled={!form.construtora}
            options={empreendimentos.map((e) => ({
              id: e.id!,
              fantasia: e.nome!,
            }))}
          />

          <SelectBasic
            label="Financeira"
            id="financeira"
            onvalue={(value) => {
              const financeiraSelecionada = financeiras.find(
                (f) => f.id === value
              );
              handleChange(
                "financeira",
                financeiraSelecionada ?? { id: null, fantasia: "" }
              );
            }}
            value={form.financeira ? form.financeira.id : ""}
            required
            isDisabled={!form.construtora}
            options={financeiras.map((f) => ({
              id: f.id!,
              fantasia: f.fantasia!,
            }))}
          />

          {session?.hierarquia === "ADM" && (
            <SelectBasic
              label="Corretor"
              id="corretor"
              onvalue={(value) => {
                const corretorSelecionado = corretores.find(
                  (c) => c.id === value
                );
                handleChange(
                  "corretor",
                  corretorSelecionado ?? { id: null, nome: "" }
                );
              }}
              value={form.corretor ? form.corretor.id : ""}
              required
              isDisabled={!form.construtora}
              options={corretores.map((c) => ({
                id: c.id!,
                fantasia: c.nome!,
              }))}
            />
          )}
        </Flex>
        <Flex gap={2}>
          <BoxBasic
            id="idfcweb"
            label={isAdmin ? "Protocolo/IDFcweb" : "Protocolo"}
            value={form.id_fcw || ""}
            isLink={isAdmin}
            href={
              isAdmin
                ? `https://redebrasilrp.com.br/fcw2/abrir_ficha.php?fc=${form.id_fcw}`
                : undefined
            }
          />
          <BoxBasic
            id="andamento"
            label="Andamento"
            value={form.andamento || ""}
          />
          <SelectMultiItem
            id="tags"
            label="Tags"
            fetchUrlGet={`/api/tags/getallid/${form.id}`}
            fetchUrlDelete={(id) => `/api/tags/delete/${id}`}
            options={tagsOptions}
            onChange={(items) => setTags(items)}
            required
          />
        </Flex>
        <Box>
          <Text fontWeight="bold" fontSize="md" mb={2}>
            DOCUMENTOS A SER ASSINADOS
          </Text>

          <Flex
            border="1px"
            borderColor="blue.200"
            bg="blue.50"
            p={3}
            borderRadius="md"
            align="center"
            gap={2}
          >
            <Icon as={AiOutlineInfoCircle} color="blue.500" boxSize={5} />
            <Text color="blue.700" fontSize="sm">
              Os processos com CNH anexada terão prioridade no atendimento
            </Text>
          </Flex>
        </Box>

        <Flex gap={2}>
          <InputFileUpload
            id="cnh"
            label="CNH"
            value={form.uploadCnh}
            onvalue={(value) => handleChange("uploadCnh", value)}
          />
          <InputFileUpload
            id="rg"
            label="RG"
            value={form.uploadRg}
            onvalue={(value) => handleChange("uploadRg", value)}
          />
        </Flex>

        <Flex gap={2} justifyContent={"flex-end"}>
          {form.distrato &&
            form.ativo &&
            ((hierarquia === "ADM" && (
              <>
                <BtRemoverDistrato id={form.id} user={user} />
              </>
            )) ||
              (hierarquia === "CCA" && (
                <>
                  <BtRemoverDistrato id={form.id} user={user} />
                </>
              )))}
          {/* {!form.id_fcw && form.ativo && (
            <CriarFcweb Dados={form} user={user} />
          )} */}
          {form.ativo && hierarquia === "ADM" && <ResendSms id={form.id} />}
          <BotaoPausar id={form.id} statusPause={form.statusAtendimento} />
          <BtnIniciarAtendimento
            hierarquia={hierarquia}
            status={form.statusAtendimento}
            aprovacao={form.andamento}
            id={form.id}
          />
          <BtnBasicSave
            size={"sm"}
            bg={"green.500"}
            color={"white"}
            onClick={handlesubmit}
            _hover={{ bg: "green.600" }}
          >
            Salvar
          </BtnBasicSave>
        </Flex>
      </Flex>
    </Flex>
  );
}
