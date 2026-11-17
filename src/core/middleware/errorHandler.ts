import type { NextFunction, Request, Response } from "express";
import type { LoggerInterface } from "../logger/Interface.js";

export const errorHandler =
	(logger: LoggerInterface) =>
	(err: unknown, req: Request, res: Response, _next: NextFunction) => {
		const error = err instanceof Error ? err : new Error(String(err));

		logger.error(req.requestId, "Unhandled error", error, {
			method: req.method,
			url: req.originalUrl,
		});

		res
			.status(500)
			.json({ message: "Internal Server Error", requestId: req.requestId });
	};
