import { Controller, Get, Post, Body, Param, Res, HttpStatus, BadRequestException } from "@nestjs/common";
import { InvestmentService } from "./investment.service";
import { CreateInvestmentDto } from "./dto/create-investment.dto";
import { ApiResponseType } from "src/types/Api";
import { Response } from "express";
import { Public } from "src/auth/auth.set-metadata";

@Controller("api/investments")
export class InvestmentController {
	constructor(private readonly investmentService: InvestmentService) {}

	@Public()
	@Post("new")
	async newInvestment(@Body() body: CreateInvestmentDto, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.investmentService.newInvestment(body);

			return res.status(HttpStatus.CREATED).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: err?.message ?? "Unable to save the new investment" });
		}
	}

	@Public()
	@Get("get/by-wallet/:walletAddress")
	async getAllInvestmentByWalletAddress(@Param("walletAddress") walletAddress: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.investmentService.getAllInvestmentByWalletAddress(walletAddress);
			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "An error was encountered while fetching" });
		}
	}

	@Public()
	@Get("get/all")
	async getAllInvestments(@Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.investmentService.getAllInvestments();
			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Something very weird went wrong" });
		}
	}

	@Get("get/info/:id")
	async getInvestmentInfo(@Param("id") id: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.investmentService.getInvestmentInfo(id);

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Something went so wrong" });
		}
	}
}
