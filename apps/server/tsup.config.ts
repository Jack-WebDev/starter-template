import { buildkitConfig } from "@repo/buildkit";

export default buildkitConfig({
	entry: ["src/index.ts", "db/**/*.ts"],
	external: ["@repo/testkit"],
	dts: false,
});
