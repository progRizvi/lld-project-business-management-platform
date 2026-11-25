import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import { NotificationSender } from "../NotificationSender.js";
import { EmailProvider } from "../providers/EmailProvider.js";

export class EmailSender extends NotificationSender {
	createProvider(): NotificationProvider {
		return new EmailProvider();
	}
}
