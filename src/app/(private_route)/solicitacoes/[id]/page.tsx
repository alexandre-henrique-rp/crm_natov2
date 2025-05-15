import { Flex } from "@chakra-ui/react";
import { GetSessionServer } from "@/lib/auth_confg";
import { Metadata } from "next";
import AlertProvider from "@/provider/AlertProvider";
import { CardUpdateSolicitacao } from "@/components/card_Update_solicitacao";
import CardListAlertCliente from "@/components/card_list_alert_cliente";
import { notFound } from "next/navigation";

const Requestes = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/${id}`;
    const session = await GetSessionServer();
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });

    if (!res.ok) {
      console.error("Requestes status:", res.status);
      return null;
    }
    const data = await res.json();
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.error("Erro no Requestes:", err);
    return null;
  }
};


const RequestAlert = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alert/get/cadastro/${id}`;
    const session = await GetSessionServer();
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      cache: "no-store",
    });
    if (!request.ok) {
      console.error("RequestAlert status:", request.status);
      return null;
    }
    const data = await request.json();
 
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return null;
  }
};

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await Requestes(params.id);
  return {
    title: data
      ? `Cliente – ${data.nome}`
      : "Cliente – não encontrado",
  };
}


export default async function perfilPage({ params }: Props) {
  const { id } = params;
  const session = await GetSessionServer();
  const user = session?.user;

  
  const data = await Requestes(id);
  if (!data) {
   
    notFound();
  }

  const dataAlert = await RequestAlert(id);

  return (
    <>
      {user && (
        <Flex
          alignItems={{ base: "center", md: "start" }}
          justifyContent={{ base: "center", md: "space-evenly" }}
          pt={{ base: 5, md: 10 }}
          pb={{ base: 5, md: 10 }}
          borderWidth={{ base: 0, md: 1 }}
          overflowX="auto"
          flexDir="column"
          gap={{ base: 5, md: 10 }}
        >
          <Flex
            w="100%"
            alignItems="center"
            flexDir="column"
            minH="100vh"
            p={4}
          >
            <AlertProvider>
              <CardUpdateSolicitacao setDadosCard={data!} user={user} />
              <CardListAlertCliente
                Id={Number(id)}
                DataAlert={dataAlert ?? []}
                user={user}
              />
            </AlertProvider>
          </Flex>
        </Flex>
      )}
    </>
  );
}