export function slugify(str: string) {
	return str
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "");
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const camelToTitle = (str: string) =>
	str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

export const truncate = (str: string, length: number) =>
	str.length > length ? `${str.slice(0, length)}...` : str;
