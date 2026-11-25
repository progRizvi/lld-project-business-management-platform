import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import { NotificationSender } from "../NotificationSender.js";
import { PushProvider } from "../providers/PushProvider.js";

export class PushSender extends NotificationSender {
	createProvider(): NotificationProvider {
		return new PushProvider();
	}
}
