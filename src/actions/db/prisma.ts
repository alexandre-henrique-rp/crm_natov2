
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    // Em desenvolvimento, use uma instância única do PrismaClient
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as typeof global & { prisma: PrismaClient }).prisma;
}

export default prisma;
