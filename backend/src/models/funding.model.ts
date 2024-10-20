import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";

export enum FundingStatus {
	PENDING = "pending",
	IN_PROGRESS = "in-progress",
	APPROVED = "approved",
	REJECTED = "rejected",
}

@Schema({ timestamps: true })
export class Funding {
	@Prop({ type: Number, required: true })
	amount: number;

	@Prop({ type: mongoose.Types.ObjectId, ref: "User" })
	requestedBy: User;

	@Prop({ type: String, default: FundingStatus.PENDING })
	status: FundingStatus;

	@Prop({ type: String })
	reason: string;

	@Prop({ type: mongoose.Types.ObjectId, ref: "User" })
	approvedBy: User;
}

export const FundingModel = SchemaFactory.createForClass(Funding);

export type FundingDocument = HydratedDocument<Funding>;
