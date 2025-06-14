import { z } from "zod";

export const emailPayloadSchema = z.object({
	to: z.string().email(),
	subject: z.string().min(1),
	html: z.string().min(1),
	text: z.string().optional(),
});

export type EmailPayloadInput = z.infer<typeof emailPayloadSchema>;
