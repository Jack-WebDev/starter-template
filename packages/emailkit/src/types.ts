export type EmailPayload = {
	to: string;
	subject: string;
	html: string;
	text?: string;
};
