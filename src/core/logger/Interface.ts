import type { logType } from "./LogType.js";

export interface LogEntryInterface {
	level: logType;
	message: string;
	context: Record<string, unknown>;
	timestamp: Date;
	meta?: Record<string, unknown> | undefined;
	requestId?: string | undefined;
	error?: Error | undefined;
}

export interface LogTransportInterface {
	log(entry: LogEntryInterface): void | Promise<void>;
}

export interface LoggerOptionsInterface {
	logLevel?: logType;
	logTransports?: LogTransportInterface[];
	context?: Record<string, unknown>;
}

export interface LoggerInterface {
	info(
		requestId: string | undefined,
		message: string,
		meta?: Record<string, unknown>,
	): void;

	warn(
		requestId: string | undefined,
		message: string,
		meta?: Record<string, unknown>,
	): void;

	error(
		requestId: string | undefined,
		message: string,
		error: Error,
		meta?: Record<string, unknown>,
	): void;

	debug(
		requestId: string | undefined,
		message: string,
		meta?: Record<string, unknown>,
	): void;
}

export interface LogFormatterInterface {
	format(entry: LogEntryInterface): string;
}
