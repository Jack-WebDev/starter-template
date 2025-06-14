export function assertUnreachable(x: never): never {
	throw new Error(`Unreachable case: ${x}`);
}

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type Merge<A, B> = {
	[K in keyof A | keyof B]: K extends keyof B
		? B[K]
		: K extends keyof A
			? A[K]
			: never;
};
