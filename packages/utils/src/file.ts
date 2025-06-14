export function getFileExtension(filename: string) {
	return filename.split(".").pop() || "";
}

export function formatFileSize(bytes: number) {
	const sizes = ["B", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "0 B";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

export function sanitizeFilename(name: string) {
	return name.replace(/[^a-z0-9_\-\.]/gi, "_");
}
