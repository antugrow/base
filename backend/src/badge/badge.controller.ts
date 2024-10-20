import { BadRequestException, Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { BadgeService } from "./badge.service";
import { Response } from "express";
import { ApiResponseType } from "src/types/Api";

@Controller("api/badges")
export class BadgeController {
	constructor(private readonly badgeService: BadgeService) {}

	@Post()
	async issueBadge(@Body() body: { title: string; farmerId: string; issuererId: string }, @Res() res: Response<ApiResponseType>) {
		try {
			await this.badgeService.issueBadge(body);

			return res.status(200).json({ status: "success", msg: "Success" });
		} catch (err) {
      console.log(err)
			throw new BadRequestException({ status: "error", msg: "Something went wrong" });
		}
	}

	@Get()
	async getAllBadges(@Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.badgeService.getAllBadges();

			return res.status(200).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Something wrong" });
		}
	}

	@Get("farmer/:id")
	async getFarmerBadges(@Param("id") id: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.badgeService.getFarmerBadges(id);
			return res.status(200).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Something wrong" });
		}
	}
}
