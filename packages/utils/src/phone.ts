type PhoneType = "mobile" | "landline";
type PhoneOptions = {
	type?: PhoneType;
	formatted?: boolean;
};

export function generateSouthAfricanPhoneNumber(
	options: PhoneOptions = {},
): string {
	const { type = "mobile", formatted = true } = options;

	const mobilePrefixes = [
		"060",
		"061",
		"062",
		"063",
		"064",
		"065",
		"066",
		"067",
		"068",
		"069",
		"071",
		"072",
		"073",
		"074",
		"076",
		"078",
		"079",
		"081",
		"082",
		"083",
		"084",
	];

	const landlinePrefixes = [
		"010",
		"011",
		"012",
		"013",
		"014",
		"015",
		"016",
		"017",
		"018",
		"021",
		"031",
		"041",
		"051",
		"061",
	];

	const prefixList = type === "mobile" ? mobilePrefixes : landlinePrefixes;
	const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];

	const number = `${prefix}${Math.floor(1000000 + Math.random() * 9000000)}`;

	return formatted
		? number.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3")
		: number;
}
