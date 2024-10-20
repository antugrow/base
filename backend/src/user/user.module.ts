import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserModel } from "src/models/user.model";
import { FarmModule } from "src/farm/farm.module";

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserModel }]), FarmModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
