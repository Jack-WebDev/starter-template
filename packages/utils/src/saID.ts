/**
 * Extracts date of birth from a South African ID number.
 * @param idNumber 13-digit SA ID number
 * @returns ISO Date string or Date object
 */
export function getDateOfBirthFromID(idNumber: string): Date {
	const year = Number.parseInt(idNumber.slice(0, 2), 10);
	const month = Number.parseInt(idNumber.slice(2, 4), 10);
	const day = Number.parseInt(idNumber.slice(4, 6), 10);

	const currentYear = new Date().getFullYear() % 100;
	const century = year <= currentYear ? 2000 : 1900;

	const dob = new Date(century + year, month - 1, day);

	if (Number.isNaN(dob.getTime())) {
		throw new Error("Invalid ID number: invalid date");
	}

	return dob;
}

/**
 * Calculates the Luhn checksum digit for a given numeric string.
 * @param idWithoutChecksum 12-digit ID body
 * @returns Single-digit checksum (0-9)
 */
function luhnChecksum(idWithoutChecksum: string): number {
	let sum = 0;

	for (let i = 0; i < idWithoutChecksum.length; i++) {
		const char = idWithoutChecksum[idWithoutChecksum.length - 1 - i];
		if (char === undefined)
			throw new Error("Invalid index access in idWithoutChecksum");
		const digit = Number.parseInt(char, 10);
		if (i % 2 === 0) {
			sum += digit;
		} else {
			const doubled = digit * 2;
			sum += doubled > 9 ? doubled - 9 : doubled;
		}
	}
	return (10 - (sum % 10)) % 10;
}

/**
 * Generates a fake but valid South African ID number.
 * @param age Age of person
 * @param gender 'male' or 'female'
 * @param birthMonth Month (1–12)
 * @param birthDay Day (1–31)
 * @returns 13-digit SA ID number string
 */
export function generateFakeSouthAfricanID(
	age: number,
	gender: "male" | "female",
	birthMonth: number,
	birthDay: number,
): string {
	const now = new Date();
	const birthYear = now.getFullYear() - age;
	const yy = (birthYear % 100).toString().padStart(2, "0");
	const mm = birthMonth.toString().padStart(2, "0");
	const dd = birthDay.toString().padStart(2, "0");

	const sequence = (
		gender === "male"
			? 5000 + Math.floor(Math.random() * 5000)
			: Math.floor(Math.random() * 5000)
	)
		.toString()
		.padStart(4, "0");

	const citizenship = "0"; // SA citizen
	const placeholder = "8"; // Usually used as 8
	const partialID = `${yy}${mm}${dd}${sequence}${citizenship}${placeholder}`;

	const checksum = luhnChecksum(partialID);

	return `${partialID}${checksum}`;
}
