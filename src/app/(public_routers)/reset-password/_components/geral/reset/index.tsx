"use client";
import { ResetPasswordComponent } from "../../uuid";
import { Box, Flex, Text } from "@chakra-ui/react";
import Loading from "@/app/loading";
import { useState } from "react";

interface IdProps {
    id: string;
}

export default function GealResetPasswordProps(IdProps: IdProps) {
    const [Load, setLoad] = useState<boolean>(false);
    const { id } = IdProps;

    const detectLoad = (e: any) => {
        console.log(e);
        if (e == 1) {
            setLoad(true);
        } else {
            setLoad(false);
        }
    };

    if (Load) {
        return (
            <>
                <Loading />
            </>
        );
    }
    return (
        <>
            {/* Verde */}
            <Flex
                w={"100vw"}
                h={"100vh"}
                maxH={"100%"}
                maxW={"100%"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                {/* Branco */}
                <Flex
                    shadow={"2xl"}
                    borderRadius={"15px"}
                    w={"55rem"}
                    // h={"300px"}
                    bg={"white"}
                    p={"2rem"}
                    gap={"-10px"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {/* [Texto redefina sua Senha e] */}
                    <Box w={"100%"}>
                        <Text
                            w={"100%"}
                            fontSize={"25px"}
                            textAlign={"center"}
                            color="#00713D"
                            alignItems={"center"}
                            fontWeight={"bold"}
                        >
                            REDEFINA SUA SENHA:
                        </Text>
                    </Box>
                    {/* Form */}
                    <Box w={"75%"}>
                        <ResetPasswordComponent id={id} load={detectLoad} />
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}
