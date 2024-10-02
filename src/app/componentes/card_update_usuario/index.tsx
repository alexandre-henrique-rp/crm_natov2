import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import UserRegisterProvider from "@/provider/UserRegister";
import { Flex, Spacer, Divider, Button } from "@chakra-ui/react";   
import React from "react";
import BotaoCancelar from "../btn_cancelar";
import { UpdateUser } from "@/actions/user/service";
import { set } from "react-hook-form";

type Props = {
    setUsuarioCard: any;
  };

export async function CardUpdateUsuario({setUsuarioCard}: Props) {
    
    console.log("🚀 ~ CardUpdateUsuario ~ setUsuarioCard:", setUsuarioCard)
    

    
    return (
        <>
        <CardCreateUpdate.Form action={UpdateUser}>
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
                <UserRegisterProvider>
                    <CardCreateUpdate.GridCpf w={"15rem"}  CPF={setUsuarioCard?.cpf ?? ''}/>
                    <CardCreateUpdate.GridName w={"35rem" } Nome={setUsuarioCard?.nome ?? ''}/>
                    <CardCreateUpdate.GridUser w={"15rem"} Usuario={setUsuarioCard?.username ?? ''} />
                    <CardCreateUpdate.GridRegisterTel w={"10rem"} tell={setUsuarioCard?.telefone ?? ''}/>
                    <CardCreateUpdate.GridEmail w={"25rem"} DataSolicitacao={setUsuarioCard ?? ''}/>
                    <CardCreateUpdate.GridUserConstrutora w={"23rem"} UserConstrutora={setUsuarioCard?.construtora ?? ''}/>
                    <CardCreateUpdate.GridUserEmpreendimento w={"25rem"} UserEmpreedimento={setUsuarioCard?.empreendimento ?? ''}/>
                    <CardCreateUpdate.GridUserFinanceiro w={"23rem"} UserFinanceira={setUsuarioCard?.Financeira ?? ''}/>
                    <CardCreateUpdate.GridUserCargo w={"20rem"} UserCargo={setUsuarioCard?.cargo ?? ''}/>
                    <CardCreateUpdate.GridUserHierarquia w={"20rem"} UserHierarquia={setUsuarioCard?.hierarquia ?? ''}/>
                </UserRegisterProvider>
                        <Spacer /> 
                    <Button type="submit" mt={2} alignSelf={'center'} colorScheme='green' size='lg'>
                       Salvar
                    </Button>
                    <BotaoCancelar mt={2} alignSelf={'center'} colorScheme='red' variant='outline' size='lg' />

            </Flex>
                <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
      </CardCreateUpdate.Form>
        </>
    )
}