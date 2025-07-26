import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: typeof prismaClient
}

const prismaClient = new PrismaClient({
  omit: {
    like: { assignedAt: true },
    follow: { assignedAt: true },
    photo: { createdAt: true, updatedAt: true },
    comment: { createdAt: true, updatedAt: true },
    user: { active: true, createdAt: true, updatedAt: true },
  },
})

const prisma = globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { prisma }
