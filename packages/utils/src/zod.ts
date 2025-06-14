import type { ZodError } from "zod";

export function flattenZodErrors(error: ZodError) {
	return error.flatten().fieldErrors;
}

export function toFormErrors(error: ZodError) {
	const errors: Record<string, string> = {};
	for (const err of error.errors) {
		if (err.path.length > 0) {
			errors[err.path.join(".")] = err.message;
		}
	}
	return errors;
}
