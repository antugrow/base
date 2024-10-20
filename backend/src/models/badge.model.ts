import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.model";

@Schema({ timestamps: true })
export class Badge {
	@Prop()
	title: string;

	@Prop({ type: mongoose.Types.ObjectId, ref: "User" })
	issuedBy: User;

	@Prop({ type: mongoose.Types.ObjectId, ref: "User" })
	issuedTo: User;

	@Prop({ type: Object })
	credential: object;
}

export const BadgeModel = SchemaFactory.createForClass(Badge);

