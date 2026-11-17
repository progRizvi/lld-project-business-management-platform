import { inspect } from "util";
import type { LogEntryInterface, LogFormatterInterface } from "../Interface.js";

export class PrettyFormatter implements LogFormatterInterface {
	format(entry: LogEntryInterface): string {
		const req = entry.requestId ? `[req:${entry.requestId}] ` : "";
		let out = `[${entry.timestamp.toISOString()}] ${entry.level.toUpperCase()} ${req}${entry.message}`;

		if (Object.keys(entry.context).length > 0) {
			out += `\n context: ${inspect(entry.context, { depth: 4 })}`;
		}

		if (entry.meta && Object.keys(entry.meta).length > 0) {
			out += `\n meta: ${inspect(entry.meta, { depth: 4 })}`;
		}
		if (entry.error) {
			out += `\n error: ${entry.error.stack ?? entry.error.message}`;
		}
		return out;
	}
}
