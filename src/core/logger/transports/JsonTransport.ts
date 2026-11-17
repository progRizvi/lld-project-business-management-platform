import type { LogEntryInterface, LogTransportInterface } from "../Interface.js";
import fs from "fs";

export class JsonTransport implements LogTransportInterface {
	async log(entry: LogEntryInterface): Promise<void> {
		// save to log file in logs folder
		const path = "./logs/";
		const fileName = "log-" + new Date().toISOString() + ".log";
		const log = `${JSON.stringify(entry)}\n`;

		try {
			await fs.promises.appendFile(path + fileName, log);
		} catch (err) {
			console.error(err);
		}
	}
}
