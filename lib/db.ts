import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";
import ws from "ws";

if (typeof window === "undefined") {
    neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({
    connectionString,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});
// eslint-disable-next-line
const adapter = new PrismaNeon(pool as any);

const prismaClientSingleton = () => {
    return new PrismaClient({
        adapter,
        log: ["query", "error", "warn", "info"],
    });
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
}

export default prisma;
