'use server';

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export const CheckCpf = async (cpf: string) => {

  const session = await getServerSession(auth);

  if (!session) {
    return{
      error: true,
      message: "Unauthorized",
      data: null,
      status: 401
    }
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/get-infos/checkcpf/${cpf}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    }
  })

  const res = await req.json();

  if(!req.ok){
    return { error: true, message: "Erro ao buscar financeira", status: 500, data: null };
  }

  if(res){
    return { error: true, message: "CPF ja cadastrado", status: 500, data: null };
  }else{
    return { error: false, message: "success", status: 202, data: res };
  }

}