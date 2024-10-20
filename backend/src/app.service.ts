import { Injectable } from "@nestjs/common";
import { issueCredential } from "./lib/did";

@Injectable()
export class AppService {
	async getHello() {
		await issueCredential();
		return "Hello World";
	}
}
