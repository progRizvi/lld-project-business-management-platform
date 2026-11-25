import type { NotificationMessageType } from "../NotificationMessageType.ts";

export interface NotificationProvider {
	send(message: NotificationMessageType): Promise<void>;
}
