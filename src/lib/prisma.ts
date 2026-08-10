import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/client/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

const pool =
  globalForPrisma.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}

