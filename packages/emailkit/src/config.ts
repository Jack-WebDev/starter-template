export const emailConfig = {
	smtp: {
		host: process.env.EMAIL_HOST || "localhost",
		port: Number(process.env.EMAIL_PORT || 1025),
		secure: false,
		auth: {
			user: process.env.EMAIL_USER || "",
			pass: process.env.EMAIL_PASS || "",
		},
	},
	defaultFrom: process.env.EMAIL_FROM || "no-reply@example.com",
};
