import { buildkitConfig } from "@repo/buildkit";

export default buildkitConfig({
	entry: ["src/index.ts"],
	external: ["zod"],
});
