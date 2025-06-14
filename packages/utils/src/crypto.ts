import { createHash } from "node:crypto";
import { createId } from "@paralleldrive/cuid2";

export const generateCuid = () => createId();

export const hashString = async (str: string): Promise<string> => {
	return createHash("sha256").update(str).digest("hex");
};
