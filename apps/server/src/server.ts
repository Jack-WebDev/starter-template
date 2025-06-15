import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";

import fastify from "fastify";
import { createContext } from "./context";
import { type AppRouter, appRouter } from "./schema";

export const server = fastify({
	maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: {
		router: appRouter,
		createContext,
		onError({ path, error }) {
			// report to error monitoring
			console.error(`Error in tRPC handler on path '${path}':`, error);
		},
	} satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

server.register(cors, {
	origin: "*",
	credentials: true,
});

server.register(swagger, {
	openapi: {
		openapi: "3.0.0",
		info: {
			title: "Test swagger",
			description: "Testing the Fastify swagger API",
			version: "0.1.0",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Development server",
			},
		],
		tags: [
			{ name: "user", description: "User related end-points" },
			{ name: "code", description: "Code related end-points" },
		],
		components: {
			securitySchemes: {
				apiKey: {
					type: "apiKey",
					name: "apiKey",
					in: "header",
				},
			},
		},
		externalDocs: {
			url: "https://swagger.io",
			description: "Find more info here",
		},
	},
});
