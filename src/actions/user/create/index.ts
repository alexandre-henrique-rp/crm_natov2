"use server";

import { PrismaClient } from '@prisma/client'
import { error, log } from 'console';

const prisma = new PrismaClient()



export default async function UserCreate(_: any, data: FormData) {


        const cpf = data.get('cpf') as string;
        const nome = data.get('nome') as string
        const username = data.get('usuario') as string
        const telefone = data.get('telefone') as string
        const email = data.get('email') as string
        const construtora = data.get('construtora') as string
        const empreendimento = data.get('empreendimento') as string
        const Financeira = data.get('financeira') as string
        const cargo = data.get('cargo') as string
        const hierarquia = data.get('hierarquia') as string
        const password = data.get('senha') as string


            const verificaCpf = await prisma.nato_user.findFirst({
                where: {
                    cpf: cpf
                }
            })

            if (verificaCpf) {
                console.log('CPF já cadastrado')

            }else if(data.get('senha') !== data.get('confirsenha')){
                console.log(data.get('Senhas não conferem'))
            }
            else
                    {
                const user = await prisma.nato_user.create({
                    data: {
                        cpf: data.get('cpf') as string,
                        nome: data.get('nome') as string,
                        username: data.get('usuario') as string,
                        telefone: data.get('telefone') as string,
                        email: data.get('email') as string,
                        construtora: data.get('construtora') as string,
                        empreendimento: data.get('empreendimento') as string,
                        Financeira: data.get('financeira') as string,
                        cargo: data.get('cargo') as string,
                        hierarquia: data.get('hierarquia') as string,
                        password: data.get('senha') as string,
                        password_key: data.get('senha') as string
                    }
                })
                return {
                    error: true,
                    message: 'Usuário cadastrado com sucesso'
                }
            }

}
