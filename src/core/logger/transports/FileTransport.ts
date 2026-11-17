import path from "path";
import { JsonFormatter } from "../formatter/JsonFormatter.js";
import type {
	LogEntryInterface,
	LogFormatterInterface,
	LogTransportInterface,
} from "../Interface.js";
import fs from "fs";

export class FileTransport implements LogTransportInterface {
	private readonly dir: string;
	private ready: Promise<void> | undefined;
	constructor(
		private readonly formatter: LogFormatterInterface = new JsonFormatter(),
		dir = "logs",
	) {
		this.dir = path.resolve(process.cwd(), dir);
	}
	private ensureDir(): Promise<void> {
		this.ready ??= fs.promises
			.mkdir(this.dir, { recursive: true })
			.then(() => {});
		return this.ready;
	}
	async log(entry: LogEntryInterface): Promise<void> {
		const line = this.formatter.format(entry) + "\n";

		const fileName = `log-${entry.timestamp.toISOString().slice(0, 10)}.log`;

		await this.ensureDir();

		await fs.promises.appendFile(path.join(this.dir, fileName), line);
	}
}
