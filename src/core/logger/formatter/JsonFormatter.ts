import type { LogEntryInterface, LogFormatterInterface } from "../Interface.js";

export class JsonFormatter implements LogFormatterInterface {
	format(entry: LogEntryInterface): string {
		return JSON.stringify(entry);
	}
}
