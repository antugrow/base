import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.set-metadata";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("api/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("signin")
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
}
