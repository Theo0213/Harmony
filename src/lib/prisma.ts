import { PrismaClient } from '@prisma/client'

// Learn more:
// https://pris.ly/d/help/next-js-best-practices

// Instance global de prisma, singleton pour eviter d'avoir plusieur connection à la db en même temps.

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma