import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";

@Schema({ timestamps: true })
export class Farm {
	@Prop({ type: mongoose.Types.ObjectId, ref: "User" })
	owner: User;
}

export const FarmModel = SchemaFactory.createForClass(Farm);

export type FarmDocument = HydratedDocument<Farm>;
