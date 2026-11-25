import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import { PushProvider } from "../providers/PushProvider.js";
import { NotificationSender } from "./NotificationSender.js";

export class PushSender extends NotificationSender {
	createProvider(): NotificationProvider {
		return new PushProvider();
	}
}
