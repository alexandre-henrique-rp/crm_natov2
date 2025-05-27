"use client";
import InputBasic from "@/components/input/basic";
import InputFileUpload from "@/components/input/doc";
import MaskedInput from "@/components/input/masked";
import SelectBasic from "@/components/input/select-basic";
import { useSession } from "@/hook/useSession";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { number } from "framer-motion";
import { useEffect, useState } from "react";
interface FormSolicitacaoEditProps {
  id?: number;
}

export default function FormSolicitacaoEdit({ id }: FormSolicitacaoEditProps) {
  const [form, setForm] = useState({
    alertanow: false,
    alerts: [],
    andamento: null as string | null,
    ativo: false,
    chamados: [],
    cnh: null,
    construtora: {
      id: null as number | null,
      fantasia: null as string | null,
    },
    construtoraId: null as number | null,
    corretor: {
      id: null as number | null,
      nome: null,
    },
    updatedAt: null as Date | null,
    uploadCnh: {},
    uploadRg: {},
    valorcd: number | null,
    cpf: "",
    nome: "",
    datanascimento: null as Date | null,
    telefone: "",
    telefone2: "",
    email: "",
    construtora: null as number | null,
    empreendimento: null as number | null,
    financeira: null as number | null,
    corretor: null as number | null,
    uploadRg: "",
    uploadCnh: "",
    relacionamento: "",
  });
  console.log("🚀 ~ FormSolicitacaoEdit ~ form:", form);
  const [Logwhats, setLogwhats] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const toast = useToast();
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
      id: null as number | null,
      nome: null as string | null,
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
  const [relacionamento, setrelacionamento] = useState<boolean>(false);
  const [Sms, setSms] = useState<boolean>(true);

  const session = useSession();

  useEffect(() => {
    if (session) {
      if (session.hierarquia === "ADM") {
        fetchADM();
      }
    }
    fetchSolicitacao();
  }, [session, id]);

  const fetchSolicitacao = async () => {
    const req = await fetch(`/api/solicitacao/get/${id}`);
    const data = await req.json();
    setForm(data);
  };
  const fetchADM = async () => {
    const req = await fetch("/api/adm/getoptions");
    const data = await req.json();
    setOptions(data);
  };

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectConstrutora = (value: number) => {
    handleChange("construtora", value);
    handleChange("empreendimento", null);
    handleChange("financeira", null);
    handleChange("corretor", null);

    const construtoraSelecionada = options.find((e) => e.id === Number(value));

    if (construtoraSelecionada) {
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
      setEmpreendimentos([]);
      setFinanceiras([]);
      setCorretores([]);
    }
  };

  const handlesubmit = async () => {};

  return (
    <Flex
      w={"100%"}
      rounded={"md"}
      margin={"1"}
      border={"1px solid #E8E8E8"}
      alignItems={"center"}
      flexDir={{ base: "column", md: "column" }}
      flexWrap={{ base: "nowrap", md: "nowrap" }}
      gap={2}
      shadow={"lg"}
    >
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Edição de Solicitação
      </Text>
      <Flex
        w={"100%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={4}
        mb={2}
      ></Flex>
    </Flex>
  );
}
