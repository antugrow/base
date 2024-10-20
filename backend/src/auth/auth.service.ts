import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	async validateUser(phoneNo: string, password: string) {
		const user = await this.userService.getUserByPhoneNo(phoneNo);

		if (user) {
			const userPass = user.password;

			const isValid = await argon2.verify(userPass, password);

			if (!isValid) {
				return null;
			}

			return user;
		}

		return null;
	}

	async login(user: any) {
		const { password, ...rest } = user;
		const payload = {
			sub: user._id,
		};

		const accessToken = this.jwtService.sign(payload);

		return {
			status: "success",
			msg: "User logged in successfully",
			data: {
				token: accessToken,
				userInfo: rest,
			},
		};
	}
}
