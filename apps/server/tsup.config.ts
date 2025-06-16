import { buildkitConfig } from "@streamit/buildkit";

export default buildkitConfig({
	entry: ["src/index.ts", "db/**/*.ts"],
	external: ["@streamit/testkit"],
	dts: false,
});
