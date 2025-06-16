import { buildkitConfig } from "@streamit/buildkit";

export default buildkitConfig({
	entry: ["src/index.ts"],
	external: ["zod"],
});
