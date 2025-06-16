import baseConfig from "@streamit/testkit";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default mergeConfig(
	baseConfig,
	defineConfig({
		plugins: [tsconfigPaths()],
		test: {
			include: ["src/**/*.{spec,test,e2e}.{ts,tsx}"],
			watch: !process.env.CI,
			testTimeout: 10000,
			hookTimeout: 5000,
		},
	}),
);
