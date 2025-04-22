'use server'

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function GetConstrutoras(){
    const session = await getServerSession(auth);



    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/dashboard/construtoras`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    })
    console.log("ate aqui t aok",req)
    
    if(!req.ok){
        return null
    }
    console.log("resposta da API ",req)
    return await req.json()
}