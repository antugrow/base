import { Module } from "@nestjs/common";
import { BadgeService } from "./badge.service";
import { BadgeController } from "./badge.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Badge, BadgeModel } from "src/models/badge.model";

@Module({
	imports: [MongooseModule.forFeature([{ name: Badge.name, schema: BadgeModel }])],
	controllers: [BadgeController],
	providers: [BadgeService],
})
export class BadgeModule {}
