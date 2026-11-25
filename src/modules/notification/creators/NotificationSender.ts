import type { NotificationProvider } from "../interfaces/NotificationProvider.js";
import type { NotificationMessageType } from "../NotificationMessageType.js";

export abstract class NotificationSender {
	abstract createProvider(): NotificationProvider;

	async sendNotification(message: NotificationMessageType): Promise<void> {
		console.log("✅ Validating request");

		console.log("📝 Writing audit log");

		const provider = this.createProvider();

		provider.send(message);

		console.log("📊 Tracking delivery");
	}
}
