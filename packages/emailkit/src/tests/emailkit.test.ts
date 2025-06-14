import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendEmail } from "../client";

const sendMailMock = vi.fn();

vi.mock("nodemailer", async (importActual) => {
	const actual = await importActual<typeof import("nodemailer")>();

	return {
		...actual,
		createTransport: vi.fn(() => ({
			sendMail: sendMailMock,
		})),
	};
});

describe("sendEmail", () => {
	beforeEach(() => {
		sendMailMock.mockClear();
	});

	it("sends an email with the correct payload", async () => {
		const payload = {
			to: "user@example.com",
			subject: "Test Subject",
			html: "<p>Yooo Jack</p>",
			text: "Bro Dude Bro",
		};

		sendMailMock.mockResolvedValue({ messageId: "abc123" });

		const result = await sendEmail(payload);

		expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining(payload));
		expect(result).toMatchObject({ messageId: "abc123" });
	});
});
