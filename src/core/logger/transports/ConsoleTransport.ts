import { PrettyFormatter } from "../formatter/PrettyFormatter.js";
import type {
	LogEntryInterface,
	LogFormatterInterface,
	LogTransportInterface,
} from "../Interface.js";
import type { logType } from "../LogType.js";

const CONSOLE_METHOD: Record<logType, "debug" | "error" | "info" | "warn"> = {
	debug: "debug",
	info: "info",
	warn: "warn",
	error: "error",
	fatal: "error",
};
export class ConsoleTransport implements LogTransportInterface {
	constructor(
		private formatter: LogFormatterInterface = new PrettyFormatter(),
	) {}
	log(entry: LogEntryInterface): void | Promise<void> {
		console[CONSOLE_METHOD[entry.level]](this.formatter.format(entry));
	}
}
