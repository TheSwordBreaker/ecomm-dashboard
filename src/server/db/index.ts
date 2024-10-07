import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "~/env";
import * as schema from "~/drizzle/schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ??
  new Client({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: { rejectUnauthorized: process.env.DB_SSLMODE === "require" },
  });

if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });

//main_owner:grVjS6hHTGF7@ep-falling-feather-a2bawvx5-pooler.eu-central-1.aws.neon.tech/main?sslmode=require

// postgresql: export const client = new Client({
//   host: process.env.DB_HOST!,
//   port: Number(process.env.DB_PORT!),
//   user: process.env.DB_USERNAME!,
//   password: process.env.DB_PASSWORD!,
//   database: process.env.DB_NAME!,
// });
