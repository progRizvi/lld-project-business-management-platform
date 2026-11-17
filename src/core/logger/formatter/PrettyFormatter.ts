import type { LogEntryInterface, LogFormatterInterface } from "../Interface.js";

export class PrettyFormatter implements LogFormatterInterface {
	format(entry: LogEntryInterface): string {
		return JSON.stringify(entry, null, 4);
	}
}
