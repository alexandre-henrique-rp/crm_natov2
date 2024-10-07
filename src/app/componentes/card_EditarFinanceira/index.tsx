import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import UserRegisterProvider from "@/provider/UserRegister";
import { Flex, Spacer, Divider, Button } from "@chakra-ui/react";   
import React from "react";
import BotaoCancelar from "../btn_cancelar";
import { UpdateFinanceira } from "@/actions/financeira/service/updateFinanceira";

type Props = {
    setFinanceiraCard: any,
    id?: number
  };

export async function CardUpdateFinanceira({id, setFinanceiraCard}: Props) {
console.log("🚀 ~ CardUpdateFinanceira ~ setFinanceiraCard:", setFinanceiraCard)

    
    return (
        <>
        <CardCreateUpdate.Form action={UpdateFinanceira}>
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
                <UserRegisterProvider>
                    <CardCreateUpdate.GridCnpj w={"15rem"} idFinanc={id} CNPJ={setFinanceiraCard?.cnpj ?? ''}  />
                    <CardCreateUpdate.GridRazaoSocial w={"35rem"} RazaoSocial={setFinanceiraCard?.razaosocial ?? ''} />
                    <CardCreateUpdate.GridRazaoSocialTel w={"10rem"} tell={setFinanceiraCard?.tel ?? ''} />
                    <CardCreateUpdate.GridRazaoSocialEmail w={"30rem"} DataSolicitacao={setFinanceiraCard ?? ''}  />
                    <CardCreateUpdate.GridResponsavel w={"25rem"} Responsavel={setFinanceiraCard?.responsavel ?? ''} />
                    <CardCreateUpdate.GridFantasia w={"15rem"} Fantasia={setFinanceiraCard?.fantasia ?? ''} />
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