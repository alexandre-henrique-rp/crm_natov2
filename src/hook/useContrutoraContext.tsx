import { ContrutoraContext } from "@/context/ConstrutoraContex";
import { useContext } from "react";

export default function useConstrutoraCOntex() {
    const context = useContext(ContrutoraContext);

    if (context === undefined) {
        throw new Error("Não esta dentro do contexto");
    }

    return context;
}