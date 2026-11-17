import type { LogEntryInterface, LogTransportInterface } from "../Interface.js";

export class ConsoleTransport implements LogTransportInterface {
	log(entry: LogEntryInterface): void | Promise<void> {
		const req = entry.requestId ? `[req:${entry.requestId}] ` : "";
		const line = `[${entry.timestamp.toISOString()}] ${entry.level.toUpperCase()} ${entry.message}`;
		const extra = { ...entry.context, ...entry.meta };
		const hasExtra = Object.keys(extra).length > 0;

		switch (entry.level) {
			case "debug":
				console.debug(line, hasExtra ? extra : "", entry.error ?? "");
				break;
			case "warn":
				console.warn(line, hasExtra ? extra : "", entry.error ?? "");
				break;
			case "error":
			case "fatal":
				console.error(line, hasExtra ? extra : "", entry.error ?? "");
				break;
			default:
				console.info(line, hasExtra ? extra : "");
		}
	}
}
