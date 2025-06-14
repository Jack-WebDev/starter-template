import { faker } from "@faker-js/faker";
import { generateFakeSouthAfricanID } from "./saID";

export const fakeUser = () => {
	const gender = faker.person.sexType() as "male" | "female";
	const age = faker.number.int({ min: 18, max: 60 });
	const birthMonth = faker.number.int({ min: 1, max: 12 });
	const birthDay = faker.number.int({ min: 1, max: 28 });

	return {
		name: faker.person.fullName({ sex: gender }),
		email: faker.internet.email(),
		phone: faker.phone.number({
			style: "national",
		}),
		gender,
		idNumber: generateFakeSouthAfricanID(age, gender, birthMonth, birthDay),
	};
};
