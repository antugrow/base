import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true, unique: true, type: String })
	phoneNo: string;

	@Prop({ required: true, type: String })
	name: string;

	@Prop({ type: String })
	password: string;

	@Prop({ type: String })
	location: string;

	@Prop({ type: String })
	role: string;

	@Prop({ type: String })
	did: string;
}

export const UserModel = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
