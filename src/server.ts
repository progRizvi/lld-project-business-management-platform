import dotenv from "dotenv";
import { Logger } from "./core/logger/Logger.js";
import { ConsoleTransport } from "./core/logger/transports/ConsoleTransport.js";
import { FileTransport } from "./core/logger/transports/FileTransport.js";
import { createApp } from "./app.js";

dotenv.config();

const logger = Logger.getInstance({
	logLevel: process.env.NODE_ENV === "production" ? "info" : "debug",
	context: { app: "business-management-platform" },
	logTransports: [new ConsoleTransport(), new FileTransport()],
});

const app = createApp(logger);
const port = Number(process.env.PORT ?? 3000);

const server = app.listen(process.env.PORT, () => {
	logger.info(undefined, "Server started", { port });
	console.log(`Server is running on port http://localhost:${port}`);
});

process.on("uncaughtException", (err) => {
	logger.error(undefined, "Uncaught exception", err);
	process.exit(1);
});

process.on("unhandledRejection", (reason) => {
	logger.error(
		undefined,
		"Unhandled rejection",
		reason instanceof Error ? reason : new Error(String(reason)),
	);
});

process.on("SIGTERM", () => {
	logger.info(undefined, "Shutting down");
	server.close(() => process.exit(0));
});
