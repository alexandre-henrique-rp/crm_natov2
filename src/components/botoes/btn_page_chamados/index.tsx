import { Button, HStack, Text } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md"; // Ícone de alerta
import getInfoChamados from "@/actions/chamados/service/infoChamados";
import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { useSession } from "next-auth/react";

// Animação para o efeito de piscar
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export default function BotaoPageChamados() {
    const [qtdChamadosAberto, setQtdChamadosAberto] = useState<number>(0);
    const session = useSession();
    const user = session?.data?.user;
    console.log("🚀 ~ BotaoPageChamados ~ user:", user)
    
    useEffect(() => {
        async function fetchData() {
            const response = await getInfoChamados();
            setQtdChamadosAberto(response?.data ?? 0);
        }
        fetchData();
    }, []);

    return (
        <Button
            size="sm"
            bg={qtdChamadosAberto > 0 && user?.hierarquia === "ADM" ? "orange.400" : "green.400"}
            border="1px solid"
            color="white"
            _hover={{
                bg: qtdChamadosAberto > 0 && user?.hierarquia === "ADM" ? "orange.500" : "green.500",
            }}
            animation={
                qtdChamadosAberto > 0 && user?.hierarquia === "ADM" ? `${blinkAnimation} 1.5s infinite` : undefined
            }
            onClick={() => window.open("/chamados")}
        >
            <HStack>
                {/* Ícone de alerta quando há chamados */}
                {qtdChamadosAberto > 0 && user?.hierarquia === "ADM" && <MdErrorOutline size="20px" />}
                <Text>Chamados {user?.hierarquia === "ADM" ? `: ${qtdChamadosAberto}` : null}</Text>
            </HStack>
        </Button>
    );
}
