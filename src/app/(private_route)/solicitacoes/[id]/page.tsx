import { Flex } from "@chakra-ui/react";
import { GetSessionServer } from "@/lib/auth_confg";
import { Metadata } from "next";
import AlertProvider from "@/provider/AlertProvider";
import { CardUpdateSolicitacao } from "@/components/card_Update_solicitacao";
import CardListAlertCliente from "@/components/card_list_alert_cliente";

const Requestes = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/${id}`;
    const session = await GetSessionServer();
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      }
    });
    if (!request.ok) {
      throw new Error("Erro");
    }
    const data = await request.json();
    // Garante que o objeto seja serializável e plain object
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return error;
  }
};

const RequestAlert = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alerts/get/cadastro/${id}`;
    const session = await GetSessionServer();
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      cache: "no-store",
      next: {
        tags: ["get_Alert"]
      }
    });
    if (!request.ok) {
      throw new Error("Erro");
    }
    const data = await request.json();
    // Garante que o objeto seja serializável e plain object
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    // Nunca retorne o objeto de erro para o cliente
    return null;
  }
};

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const request = await Requestes(id);
  return {
    title: `Cliente - ${request.nome}`
  };
}

export default async function perfilPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await GetSessionServer();
  const user = session?.user;

  const data = await Requestes(id);
  const dataAlert = await RequestAlert(id);

  return (
    <>
      {user && (
        <>
          <Flex
            alignItems={{ base: "center", md: "start" }}
            justifyContent={{ base: "center", md: "space-evenly" }}
            pt={{ base: 5, md: 10 }}
            pb={{ base: 5, md: 10 }}
            borderWidth={{ base: 0, md: 1 }}
            overflowX="auto"
            flexDir={"column"}
            gap={{ base: 5, md: 10 }}
          >
            <Flex
              w={"100%"}
              alignItems="center"
              flexDir="column"
              minH="100vh"
              p={4}
            >
              <AlertProvider>
                <CardUpdateSolicitacao setDadosCard={data} user={user} />
                <CardListAlertCliente
                  Id={Number(id)}
                  DataAlert={dataAlert}
                  user={user}
                />
              </AlertProvider>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
}
