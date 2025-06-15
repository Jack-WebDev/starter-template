import { server } from "./server";

(async () => {
	try {
		console.log("Starting server...");
		server.get("/healthz", async (request, reply) => {
			return { status: "ok" };
		});

		await server.listen({ port: 3000 });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();
