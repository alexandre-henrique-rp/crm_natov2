'use server'
import { PrismaClient } from "@prisma/client"
import { CreateSuportDto } from "../dto/createService.dto"
import { SuporteTagsOptions } from "@/data/suporte"

const prisma = new PrismaClient()

export async function createSuportAlert(id: number, descricao: string, tags: number) {
    const tagObj = SuporteTagsOptions.find((tag) => tag.id === tags)
    const tag = tagObj ? tagObj.label : ''

    const dto = new CreateSuportDto(id, descricao, tag)
    const erroValidate = dto.validar()
    if (erroValidate) {
        return { error: true, message: erroValidate }
    }

    try {
        const req = await prisma.nato_suporte.create({
            data: {
                solicitacao: id,
                tag: tag,
                deescricao: descricao,
            }
        })
        return { error: false, message: "Suporte criado com sucesso", data: req }
    } catch{
        return { error: true, message: "Erro ao criar suporte", data: null }
    } finally {
        await prisma.$disconnect()
    }
}
