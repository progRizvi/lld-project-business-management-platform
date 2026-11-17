import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import type { LoggerInterface } from "../logger/Interface.js";

export const requestLogger =
	(logger: LoggerInterface) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const id = req.header("x-request-id") ?? randomUUID();
		req.requestId = id;
		res.setHeader("x-request-id", id);

		const start = process.hrtime.bigint();
		logger.info(id, "Request started", { url: req.url, method: req.method });

		res.on("finish", () => {
			const ms = Number(process.hrtime.bigint() - start) / 1e6;
			const meta = {
				method: req.method,
				url: req.originalUrl,
				status: res.statusCode,
				durationMs: Math.round(ms),
			};

			if (res.statusCode >= 500)
				logger.error(
					id,
					"Request finished",
					new Error(`HTT: ${res.statusCode}`),
					meta,
				);
			else if (res.statusCode >= 400) logger.warn(id, "Request finished", meta);
			else logger.info(id, "Request finished", meta);
		});
		next();
	};
