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

interface SolicitacaoType {
  id: number | null;
  nome: string | null;
  email: string | null;
  cpf: string | null;
  telefone: string | null;
  telefone2: string | null;
  dt_nascimento: string | null;
  id_fcw: number | null;
  obs: string | null;
  ativo: boolean | null;
  rela_quest: boolean | null;
  dt_distrato: Date | null;
  status_aprovacao: Boolean | null;
  distrato_id: number | null;
  andamento: string | null;
  type_validacao: string | null;
  dt_aprovacao: Date | null;
  ht_aprovacao: Date | null;
  dt_agendamento: Date | null;
  hr_agendamento: Date | null;
  estatos_pgto: string | null;
  valorcd: number | null;
  situacao_pgto: number | null;
  freqSms: number | null;
  alertanow: boolean | null;
  dt_criacao_now: Date | null;
  statusAtendimento: boolean | null;
  pause: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  relacionamento: {
    id: number | null;
    nome: string | null;
  };
  dt_revogacao: Date | null | string;
  direto: boolean | null;
  txid: string | null;
  chamados: [
    {
      id: number | null;
      descricao: string | null;
    }
  ];
  construtora: {
    id: number;
    fantasia: string;
  };
  empreendimento: {
    id: number;
    nome: string;
  };
  financeira: {
    id: number;
    fantasia: string;
  };
  corretor: {
    id: number;
    nome: string;
  };
  uploadCnh: any | null;
  uploadRg: any | null;
  distrato: boolean | null;
}

export default function FormSolicitacaoEdit({
  id,
  data,
}: FormSolicitacaoEditProps) {
  const user = useSession();
  console.log("🚀 ~ data:", data);
  const hierarquia = user?.hierarquia ? user.hierarquia : null;
  const isAdmin = user?.hierarquia === "ADM";
  const [tagsOptions, setTagsOptions] = useState([] as any[]);
  const [Tags, setTags] = useState([] as any[]);
  const [form, setForm] = useState<SolicitacaoType>({
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    telefone2: "",
    dt_nascimento: "",
    id_fcw: 0,
    obs: "",
    ativo: false,
    rela_quest: false,
    dt_distrato: null ,
    status_aprovacao: false,
    distrato_id: 0,
    andamento: "",
    type_validacao: "",
    dt_aprovacao: null,
    ht_aprovacao: null,
    dt_agendamento: null,
    hr_agendamento: null,
    estatos_pgto: "",
    valorcd: 0,
    situacao_pgto: 0,
    freqSms: 0,
    alertanow: false,
    dt_criacao_now: null,
    statusAtendimento: false,
    pause: false,
    createdAt: "",
    updatedAt: "",
    relacionamento: {
      id: 0,
      nome: "",
    },
    dt_revogacao: "",
    direto: false,
    txid: "",
    chamados: [
      {
        id: 0,
        descricao: "",
      },
    ],
    construtora: {
      id: 0,
      fantasia: "",
    },
    empreendimento: {
      id: 0,
      nome: "",
    },
    financeira: {
      id: 0,
      fantasia: "",
    },
    corretor: {
      id: 0,
      nome: "",
    },
    uploadCnh: null,
    uploadRg: null,
    distrato: null,
  });
  const [options, setOptions] = useState([
    {
      id: 0,
      fantasia: "",
      empreendimentos: [
        {
          id: 0,
          nome: "",
        },
      ],
      financeiros: [
        {
          financeiro: {
            id: 0,
            fantasia: "",
          },
        },
      ],
      colaboradores: [
        {
          id: 0,
          nome: "",
        },
      ],
    },
  ]);
  console.log("🚀 ~ options:", options);
  const [empreendimentos, setEmpreendimentos] = useState([
    {
      id: 0,
      nome: "",
    },
  ]);
  const [financeiras, setFinanceiras] = useState([
    {
      id: 0,
      fantasia: "",
    },
  ]);
  const [corretores, setCorretores] = useState([
    {
      id: 0,
      nome: "",
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



      if (data.construtora?.id && options.length > 0) {
        const construtoraSelecionada = options.find((e) => {
          return e.id === data.construtora?.id;
        });

        if (construtoraSelecionada) {
          setEmpreendimentos(construtoraSelecionada.empreendimentos);
          setFinanceiras(
            construtoraSelecionada.financeiros.map((f: any) => f.financeiro)
          );
          setCorretores(
            construtoraSelecionada.colaboradores.map((colab: any) => ({
              id: colab.user.id,
              nome: colab.user.nome,
            }))
          );
        }
      }
    }
  }, [id, session, data]);

  const fetchADM = async () => {
    const req = await fetch("/api/adm/getoptions");
    const res = await req.json();
    setOptions(res);
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

          {options
            .filter((c) => c.id === form.construtora?.id)
            .map((c) => (
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
                options={c.empreendimentos.map((e) => ({
                  id: e.id!,
                  fantasia: e.nome!,
                }))}
              />
            ))}
            {/* <SelectBasic
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
            value={form.empreendimento ? form.empreendimento.id : 0}
            required
            isDisabled={!form.construtora}
            options={empreendimentos.map((e) => ({
              id: e.id!,
              fantasia: e.nome!,
            }))}
          /> */}

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
