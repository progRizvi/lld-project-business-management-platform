import type { NotificationProvider } from "../interfaces/NotificationProvider.ts";
import type { NotificationMessageType } from "../NotificationMessageType.ts";

class SmsProvider implements NotificationProvider {
	async send(message: NotificationMessageType): Promise<void> {}
}
