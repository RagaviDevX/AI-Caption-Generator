// Prisma client - generated at runtime after `npx prisma generate`
// eslint-disable-next-line @typescript-eslint/no-var-requires
let prismaInstance: any;

function getPrisma() {
  if (!prismaInstance) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { PrismaClient } = require("@prisma/client");
      prismaInstance = new PrismaClient();
    } catch {
      // During build without generated client, return a proxy
      prismaInstance = new Proxy({}, {
        get: () => () => Promise.reject(new Error("Prisma client not generated. Run: npx prisma generate")),
      });
    }
  }
  return prismaInstance;
}

export const prisma = typeof window === "undefined" ? getPrisma() : null;
