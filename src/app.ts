import cors from "cors";

import express from "express";
import type { LoggerInterface } from "./core/logger/Interface.js";
import { errorHandler } from "./core/middleware/errorHandler.js";
import { requestLogger } from "./core/middleware/requestLogger.js";

export function createApp(logger: LoggerInterface): express.Application {
	const app = express();

	// middleware

	app.use(requestLogger(logger));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());

	app.get("/", (req, res) => {
		res.send("Hello World!");
	});

	app.use((req, res) => {
		res.status(404).json({ message: "Not Found", requestId: req.requestId });
	});

	// error handler

	app.use(errorHandler(logger));

	return app;
}
