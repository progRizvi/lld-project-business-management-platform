import { Logger } from "../../core/logger/Logger.js";

export class AuthService {
	private logger = Logger.getInstance();
	constructor() {}

	async login(email: string, password: string): Promise<boolean> {
		this.logger.info("Logging in...", "AuthService");
		return true;
	}
}
