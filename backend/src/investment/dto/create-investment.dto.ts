import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateInvestmentDto {
	@IsNumber()
	amount: number;

	@IsString()
	walletAddress: string;

	@IsNumber()
	duration: number;

	@IsString()
	category: string;

	@IsObject()
	@IsOptional()
	transactionInfo: Record<string, any>;
}
