import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, protect against multiple instances of Prisma Client
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;