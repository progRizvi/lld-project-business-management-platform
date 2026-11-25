import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import { NotificationSender } from "../NotificationSender.js";
import { SmsProvider } from "../providers/SmsProvider.js";

export class SmsSender extends NotificationSender {
	createProvider(): NotificationProvider {
		return new SmsProvider();
	}
}
