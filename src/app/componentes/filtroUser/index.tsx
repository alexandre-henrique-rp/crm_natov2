'use client'
import { SelectUserConstrutora } from "@/app/implementes/cardCreateUpdate/dropdow/selectUserconstrutora";
import UserFiltroContext from "@/hook/userFilterContext";
import { InputGroup, InputLeftAddon, Input, Button } from "@chakra-ui/react";
import React from "react";


export default function FiltroUser() {
    const { id, setId, nome, setNome, construtora, setConstrutora, hierarquia, setHierarquia, financeira, setFinanceira } = UserFiltroContext();

    


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "id") setId(Number(value));
        if (name === "nome") setNome(value);

    };

    const handleFilter = async () => {
        
    }
    

    return(
        <>
            <InputGroup>
            <InputLeftAddon bg={'gray.300'}>ID</InputLeftAddon>
            <Input placeholder="ID" focusBorderColor="lime" mr={2} w={'5%'} name="id" onChange={handleInputChange}/>
            <InputLeftAddon bg={'gray.300'}>Nome</InputLeftAddon>
            <Input placeholder="Nome do Usuário" focusBorderColor="lime" mr={2} w={'20%'} name="nome" onChange={handleInputChange}/>
            <SelectUserConstrutora setValue={}></SelectUserConstrutora>
            </InputGroup>
            <Button onClick={handleFilter}></Button>
        </>
    )
}