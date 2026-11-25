import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import { SmsProvider } from "../providers/SmsProvider.js";
import { NotificationSender } from "./NotificationSender.js";

export class SmsSender extends NotificationSender {
	createProvider(): NotificationProvider {
		return new SmsProvider();
	}
}
