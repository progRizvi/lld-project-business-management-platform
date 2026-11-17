import { inspect } from "util";
import type { LogEntryInterface, LogFormatterInterface } from "../Interface.js";

export class PrettyFormatter implements LogFormatterInterface {
	format(entry: LogEntryInterface): string {
		const req = entry.requestId ? `[req:${entry.requestId}] ` : "";
		let out = `[${entry.timestamp.toISOString()}] ${entry.level.toUpperCase()} ${req}${entry.message}`;

		if (Object.keys(entry.context).length > 0) {
			out += `\ncontext: ${inspect(entry.context, { depth: 4 })}`;
		}

		if (entry.meta && Object.keys(entry.meta).length > 0) {
			out += `\nmeta: ${inspect(entry.meta, { depth: 4 })}`;
		}
		if (entry.error) {
			out += `\nerror: ${entry.error.stack ?? entry.error.message}`;
		}
		return out;
	}
}
