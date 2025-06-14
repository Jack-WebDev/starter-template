import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/setup/setupTests.ts"],
		include: ["src/**/*.{spec,test,e2e}.{ts,tsx}"],
		exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
		poolOptions: {
			threads: {
				maxThreads: process.env.CI ? 2 : 4,
			},
		},
		coverage: {
			provider: "v8",
			all: true,
			reporter: ["text", "json", "html"],
			reportsDirectory: "./coverage",
			exclude: [
				"**/node_modules/**",
				"**/dist/**",
				"**/.next/**",
				"**/__mocks__/**",
				"**/setup/**",
				"**/*.d.ts",
			],
		},
		watch: !process.env.CI,
		reporters: process.env.CI ? "default" : ["default", "html"],
		testTimeout: 10000,
		hookTimeout: 5000,
		isolate: true,
		restoreMocks: true,
	},
});
