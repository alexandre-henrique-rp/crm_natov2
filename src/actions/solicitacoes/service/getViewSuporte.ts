'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function GetViewSuporte(id: number) {
    try {
        const registro = await prisma.nato_suporte.findMany({
            where: {
                solicitacao: id
            },
        })

        return { error: false, message: "Imagem salva com sucesso", data: registro.map((item) => {
            return{
                ...item,
                ...(item.urlSuporte &&{urlSuporte : JSON.parse(item.urlSuporte)})
            }
        }) }
    } catch (error) {
        console.error("Erro:", error)
        return { error: true, message: "Erro ao salvar imagem", data: null }
    } finally {
        await prisma.$disconnect()
    }
}