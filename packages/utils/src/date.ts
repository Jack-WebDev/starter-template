import { format, formatDistanceToNow } from "date-fns";

export const formatDate = (date: Date | string, fmt = "yyyy-MM-dd") =>
	format(new Date(date), fmt);

export const timeAgo = (date: Date | string) =>
	formatDistanceToNow(new Date(date), { addSuffix: true });

export const isSameDay = (a: Date, b: Date) =>
	a.toDateString() === b.toDateString();
