"use client";

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IdProps {
    id: string;
    load: any;
}

export const ResetPasswordComponent = (IdProps: IdProps) => {
    const { id } = IdProps;
    const [Load, setLoad] = useState<boolean>(false);
    const [Pass1, setPass1] = useState<string>("");
    const [Pass2, setPass2] = useState<string>("");
    const toast = useToast();
    const router = useRouter();

    const HandleSubmit: any = async (e: any) => {
        e.preventDefault();
        setLoad(true);
        if (Pass1 !== Pass2) {
            toast({
                title: "Erro",
                description: "A senha não corresponde a confirmação",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            setLoad(false);
        }
        try {
            const request = await fetch(`/api/reset-password/password/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: Pass1,
                }),
                cache: "no-store",
            });
            const response = await request.json();
            if (request.status !== 200) {
                throw { message: response.message };
                // toast({
                //     title: "Erro",
                //     description: response.message,
                //     status: "error",
                //     duration: 4000,
                //     isClosable: true,
                // });
                // setLoad(false);
            }
            toast({
                title: "Sucesso",
                description: response.message,
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            setLoad(false);
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast({
                title: "Erro",
                description: error.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            setLoad(false);
        }
    };

    const HandleVoltar: any = (e: any) => {
        e.preventDefault();
        IdProps.load(1);
        router.push("/login");
    };
    return (
        <>
            <FormControl>
                <FormLabel
                    color={"#00713D"}
                    fontFamily={"roboto"}
                    fontSize={"25px"}
                    mt={"3rem"}
                ></FormLabel>
                <Input
                    placeholder="Insira sua Senha"
                    size={"lg"}
                    type="password"
                    border={"1px solid #00713D"}
                    onChange={(e) => setPass1(e.target.value)}
                />
                <Input
                    placeholder="Confirme sua Senha"
                    size={"lg"}
                    type="password"
                    border={"1px solid #00713D"}
                    mt={"2%"}
                    onChange={(e) => setPass2(e.target.value)}
                />
            </FormControl>

            <Flex mt={"35px"} justifyContent={"space-between"} w={"100%"}>
                {" "}
                <Button
                    size={"lg"}
                    colorScheme="gray"
                    isLoading={Load}
                    onClick={HandleVoltar}
                >
                    Voltar
                </Button>
                <Button
                    size={"lg"}
                    colorScheme="green"
                    isLoading={Load}
                    onClick={HandleSubmit}
                >
                    Enviar
                </Button>
            </Flex>
        </>
    );
};
