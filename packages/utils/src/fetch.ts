import type { ZodSchema } from "zod";

export async function safeFetch<T>(
	url: string,
	options?: RequestInit,
	schema?: ZodSchema<T>,
): Promise<T | null> {
	try {
		const res = await fetch(url, options);
		if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
		const json = await res.json();
		if (schema) {
			const result = schema.safeParse(json);
			if (!result.success) throw new Error("Invalid response schema");
			return result.data;
		}
		return json as T;
	} catch (err) {
		console.error("safeFetch error:", err);
		return null;
	}
}
