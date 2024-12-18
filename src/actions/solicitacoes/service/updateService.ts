'use server'
import { SuporteTagsOptions } from "@/data/suporte";
import { PrismaClient } from "@prisma/client";
import { CreateSuportDto } from "../dto/createService.dto";

const prisma = new PrismaClient();

export default async function UpdateService(id: number, tagId: number, descricao: string, urlSuporte: any) {

  const imgSalvas = await prisma.nato_suporte.findUnique({
    where: {
      id: id,
    },
    select: {
      urlSuporte: true
    }
  })
  if(imgSalvas && imgSalvas.urlSuporte){
    const urlSuporteSalvas = JSON.parse(imgSalvas.urlSuporte)
    urlSuporte = urlSuporte.concat(urlSuporteSalvas)
  }
  
  const tagObj = SuporteTagsOptions.find((tag) => tag.id === tagId)
  const tag = tagObj ? tagObj.label : ''
  const dto = new CreateSuportDto(id, descricao, tag)
  const erroValidate = dto.validar()
  if (erroValidate) {
      return { error: true, message: erroValidate }
  }
  try{
      const req = await prisma.nato_suporte.update({
      where: {
        id: id,
      },
      data: {
          tag: tag,
          deescricao: descricao,
          urlSuporte: JSON.stringify(urlSuporte),
      },
    })
    return {error: false, message: "Suporte atualizado com sucesso",data: req}
  }catch{
        return {error: true, message: "Erro ao atualizar suporte", data: null}
  }finally{
      await prisma.$disconnect();
  }
}