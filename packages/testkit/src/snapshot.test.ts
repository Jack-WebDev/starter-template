import { describe, expect, test } from "vitest";

describe("snapshot test", () => {
	test("basic object", () => {
		const user = { id: 1, name: "Jack" };
		expect(user).toMatchSnapshot();
	});
});
