import dotenv from "dotenv";
dotenv.config({ path: ".env.development.dist" });

import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL as string);
