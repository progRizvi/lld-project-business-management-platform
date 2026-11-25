import type { NotificationMessageType } from "../NotificationMessageType.ts";
import type { NotificationProvider } from "../interfaces/NotificationProvider.ts";

export class PushProvider implements NotificationProvider {
	async send(message: NotificationMessageType): Promise<void> {}
}
