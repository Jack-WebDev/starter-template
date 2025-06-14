import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	DATABASE_URL: z.string().url(),
});

export const getEnv = () => {
	return envSchema.parse(process.env);
};

export const isDev = () => process.env.NODE_ENV === "development";
export const isProd = () => process.env.NODE_ENV === "production";
