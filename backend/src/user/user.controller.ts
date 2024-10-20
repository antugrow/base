import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/models/user.model";
import { Response } from "express";
import { ApiResponseType } from "src/types/Api";
import { Public } from "src/auth/auth.set-metadata";

@Controller("api/users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post()
	async createAccount(@Body() body: User, @Res() res: Response<ApiResponseType>) {
		try {
			const newUser = await this.userService.createUser(body);

			return res.status(HttpStatus.CREATED).json({ status: "success", data: newUser });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: err?.message ?? "Account not created" });
		}
	}

	@Get("farmers")
	async getFarmers(@Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.userService.getFarmersUsers();

			return res.status(HttpStatus.OK).json({
				status: "success",
				data,
			});
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Error" });
		}
	}
}
