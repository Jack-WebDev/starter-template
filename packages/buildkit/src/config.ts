import { type Options, defineConfig } from "tsup";

export type BuildkitOptions = Options;

export const buildkitConfig = (opts: Partial<BuildkitOptions> = {}) =>
	defineConfig({
		entry: ["src/index.ts"],
		format: ["esm"],
		dts: true,
		sourcemap: true,
		clean: true,
		skipNodeModulesBundle: true,
		...opts,
	});
