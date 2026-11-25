import type { NotificationProvider } from "../interfaces/NotificationProvider.ts";
import type { NotificationMessageType } from "../NotificationMessageType.ts";

export class SmsProvider implements NotificationProvider {
	async send(message: NotificationMessageType): Promise<void> {}
}
