import { PrettyFormatter } from "../formatter/PrettyFormatter.js";
import type {
	LogEntryInterface,
	LogFormatterInterface,
	LogTransportInterface,
} from "../Interface.js";

export class ConsoleTransport implements LogTransportInterface {
	constructor(
		private formatter: LogFormatterInterface = new PrettyFormatter(),
	) {}
	log(entry: LogEntryInterface): void | Promise<void> {
		const req = entry.requestId ? `[req:${entry.requestId}] ` : "";
		const line = `[${entry.timestamp.toISOString()}] ${entry.level.toUpperCase()} ${req}${entry.message}`;

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
