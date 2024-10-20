import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { FundingService } from "./funding.service";
import { Response } from "express";
import { ApiResponseType } from "src/types/Api";

@Controller("api/funding")
export class FundingController {
	constructor(private readonly fundingService: FundingService) {}

	@Post()
	async newRequest(@Body() body: { amount: number; userId: string; reason: string }, @Res() res: Response<ApiResponseType>) {
		try {
			const newReq = await this.fundingService.newRequest(body);

			return res.status(HttpStatus.CREATED).json({ status: "success", data: newReq });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: err?.message });
		}
	}

	@Get()
	async getAllRequests(@Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.fundingService.getAllRequests();

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: err?.message });
		}
	}

	@Get("my-requests/:userId")
	async getMyRequests(@Param("userId") userId: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.fundingService.getMyRequests(userId);

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: err?.message });
		}
	}

	@Get("details/:id")
	async getRequestInfo(@Param("id") id: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.fundingService.getRequestInfo(id);

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Unable to get" });
		}
	}

	@Put("approve/:id")
	async approveRequest(@Param("id") id: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.fundingService.approveRequest(id);

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: err?.message });
		}
	}
}
