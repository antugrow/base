import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "phoneNo", passwordField: "password" });
	}

	async validate(phoneNo: string, password: string) {
		const user = await this.authService.validateUser(phoneNo, password);

		if (!user) {
			throw new UnauthorizedException({
				status: "error",
				msg: "Invalid credentials",
			});
		}

		return user;
	}
}
