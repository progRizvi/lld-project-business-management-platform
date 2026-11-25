import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import { EmailProvider } from "../providers/EmailProvider.js";
import { NotificationSender } from "./NotificationSender.js";

export class EmailSender extends NotificationSender {
	createProvider(): NotificationProvider {
		return new EmailProvider();
	}
}
