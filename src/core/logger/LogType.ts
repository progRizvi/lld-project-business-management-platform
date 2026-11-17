export type logType = "debug" | "info" | "warn" | "error" | "fatal";

export const LOG_LEVELS: Record<logType, number> = {
	debug: 10,
	info: 20,
	warn: 30,
	error: 40,
	fatal: 50,
};
