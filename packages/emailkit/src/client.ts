import * as nodemailer from "nodemailer";
import { emailConfig } from "./config";
import type { EmailPayload } from "./types";

export async function sendEmail(payload: EmailPayload) {
	const transporter = nodemailer.createTransport(emailConfig.smtp);
	const mailOptions = {
		from: emailConfig.defaultFrom,
		to: payload.to,
		subject: payload.subject,
		html: payload.html,
		text: payload.text,
	};

	if (process.env.NODE_ENV === "development") {
		console.log("[Email Preview]", {
			to: payload.to,
			subject: payload.subject,
			preview: `${payload.html.slice(0, 100)}...`,
		});
	}

	return transporter.sendMail(mailOptions);
}
