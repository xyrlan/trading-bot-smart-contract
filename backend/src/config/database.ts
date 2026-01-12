import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

// Prisma 7: Pass database URL to PrismaClient constructor
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.__prisma;
}

export const db = prisma;

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  console.log('🔌 Database disconnected');
}
