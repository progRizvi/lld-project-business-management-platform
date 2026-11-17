import type { LogEntryInterface, LogFormatterInterface } from "../Interface.js";

export class JsonFormatter implements LogFormatterInterface {
	format(entry: LogEntryInterface): string {
		const { error, timestamp, ...rest } = entry;
		return JSON.stringify({
			...rest,
			timestamp: timestamp.toISOString(),
			...(error && {
				error: {
					name: error.name,
					message: error.message,
					stack: error.stack,
				},
			}),
		});
	}
}
