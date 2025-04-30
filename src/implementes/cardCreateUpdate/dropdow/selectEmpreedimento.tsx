"use client";
import { Select, SelectProps } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";

import useUserCompraContext from "@/hook/useUserCompraContext";
import { useSession } from "@/hook/useSession";

type Empreendimento = { id: number; nome: string };
type SelectEmpreendimentoProps = SelectProps;

export default function SelectEmpreendimento(props: SelectEmpreendimentoProps) {
  const { ContrutoraCX, setEmpreedimentoCX } = useUserCompraContext();

  const user = useSession();              
  const hierarquia = user?.hierarquia;

  const [data, setData] = useState<Empreendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;                  

    async function load() {
      setLoading(true);


      if (hierarquia === "ADM" && ContrutoraCX > 0) {
        const res = await (await fetch(
          `/api/empreendimento/getall/filter/${ContrutoraCX}`
        )).json();
        if (!ignore) setData(res);
      }

      else if (hierarquia === "ADM") {
        const res = await (await fetch(`/api/empreendimento/getall`)).json();
        if (!ignore) setData(res);
      }
 
      else if (user?.empreendimento) {
  
        const lista = Array.isArray(user.empreendimento)
          ? user.empreendimento
          : [user.empreendimento];
        if (!ignore) setData(lista as Empreendimento[]);
      } else if (!ignore) {
        setData([]);                     
      }

      if (!ignore) setLoading(false);
    }

    load();
    return () => { ignore = true; };    
  }, [hierarquia, ContrutoraCX, user?.empreendimento]);
  if (loading) return <BeatLoader color="#36d7b7" />;

  return (
    <Select
      {...props}
      name="empreendimento"
      placeholder="Selecione um empreendimento"
      onChange={(e) => setEmpreedimentoCX(Number(e.target.value))}
      isDisabled={!data.length}
    >
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nome}
        </option>
      ))}
    </Select>
  );
}
