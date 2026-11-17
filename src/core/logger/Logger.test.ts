import { assert, beforeEach, describe, expect, it } from "vitest";

import type { LogEntryInterface, LogTransportInterface } from "./Interface.js";
import { Logger } from "./Logger.js";

class SpyTransport implements LogTransportInterface {
	entries: LogEntryInterface[] = [];
	log(entry: LogEntryInterface): void {
		this.entries.push(entry);
	}
}
class BrokenTransport implements LogTransportInterface {
	log(entry: LogEntryInterface): void {
		throw new Error("broken");
	}
}

describe("Logger", () => {
	beforeEach(() => {
		Logger.resetForTests();
	});
	it("getInstance() should return a singleton", () => {
		const a = Logger.getInstance();
		const b = Logger.getInstance();
		expect(a).toBe(b);
	});
});
