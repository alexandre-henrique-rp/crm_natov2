"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AtualizarFcw(data: any) {
  await Promise.all(
    data.map((e: any) => {
      return prisma.fcweb.update({
        where: {
          id: e.id_fcw
        },
        data: {
          estatos_pgto: "Pago"
        }
      });
    })
  );
}
