export function groupBy<T>(array: T[], key: keyof T) {
	return array.reduce(
		(result, item) => {
			const group = item[key] as unknown as string;
			result[group] = result[group] || [];
			result[group].push(item);
			return result;
		},
		{} as Record<string, T[]>,
	);
}

export function chunk<T>(array: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
		array.slice(i * size, i * size + size),
	);
}

export function uniq<T>(array: T[]): T[] {
	return Array.from(new Set(array));
}
