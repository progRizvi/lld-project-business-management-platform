import type {
	LogEntryInterface,
	LoggerInterface,
	LoggerOptionsInterface,
	LogTransportInterface,
} from "./Interface.js";
import { LOG_LEVELS, type logType } from "./LogType.js";
import { ConsoleTransport } from "./transports/ConsoleTransport.js";

export class Logger implements LoggerInterface {
	private static instance: Logger | undefined;

	private constructor(
		private readonly level: logType,
		private readonly context: Record<string, unknown>,
		private readonly transports: LogTransportInterface[],
	) {}

	public static getInstance(options: LoggerOptionsInterface = {}): Logger {
		Logger.instance ??= new Logger(
			options.logLevel ?? "info",
			options.context ?? {},
			options.logTransports ?? [new ConsoleTransport()],
		);
		return Logger.instance;
	}

	private write(
		level: logType,
		message: string,
		requestId?: string | undefined,
		meta?: Record<string, unknown>,
		error?: Error | undefined,
	) {
		if (LOG_LEVELS[level] < LOG_LEVELS[this.level]) return;

		const entry: LogEntryInterface = {
			level,
			message,
			timestamp: new Date(),
			requestId,
			context: { ...this.context },
			meta,
			error,
		};

		for (const t of this.transports) {
			try {
				Promise.resolve(t.log(entry)).catch((err) => {
					console.error("Log transport failed: ", err);
				});
			} catch (error) {
				console.error("Log transport failed: ", error);
			}
		}
	}

	info(
		requestId: string | undefined,
		msg: string,
		meta?: Record<string, unknown>,
	) {
		this.write("info", msg, requestId, meta);
	}
	warn(
		requestId: string | undefined,
		msg: string,
		meta?: Record<string, unknown>,
	) {
		this.write("warn", msg, requestId, meta);
	}
	error(
		requestId: string | undefined,
		msg: string,
		error: Error,
		meta?: Record<string, unknown>,
	) {
		this.write("error", msg, requestId, meta, error);
	}
	debug(
		requestId: string | undefined,
		msg: string,
		meta?: Record<string, unknown>,
	): void {
		this.write("debug", msg, requestId, meta);
	}
}
