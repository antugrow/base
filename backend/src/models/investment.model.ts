import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum InvestmentFarmCategory {
	ALL = "all",
	DAIRY = "dairy",
	POULTRY = "poultry",
	PIGS = "PIGS",
}

@Schema({ timestamps: true })
export class Investment {
	@Prop({ type: Number, required: true })
	amount: number;

	@Prop({ type: String, required: true })
	walletAddress: string;

	@Prop({ type: Number, default: 12 })
	duration: number; // duration for the investment in months

	@Prop({ type: String, default: InvestmentFarmCategory.ALL })
	category: InvestmentFarmCategory;

	@Prop({ type: Object })
	transactionInfo: Record<string, any>
}

export const InvestmentModel = SchemaFactory.createForClass(Investment);

export type InvestmentDocument = HydratedDocument<Investment>;
