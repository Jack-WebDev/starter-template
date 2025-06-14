import { render } from "@react-email/render";
import { WelcomeEmail } from "./templates/Welcome";

export function renderWelcomeEmail(name: string) {
	const component = WelcomeEmail({ name });
	const html = render(component);
	const text = `Welcome, ${name}!\nThanks for signing up.`;

	return {
		subject: `Welcome, ${name}!`,
		html,
		text,
	};
}
