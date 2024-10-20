import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./auth/auth.set-metadata";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	async getHello() {
		return await this.appService.getHello();
	}
}
