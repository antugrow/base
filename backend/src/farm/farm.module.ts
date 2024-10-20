import { Module } from "@nestjs/common";
import { FarmService } from "./farm.service";
import { FarmController } from "./farm.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Farm, FarmModel } from "src/models/farm.model";

@Module({
	imports: [MongooseModule.forFeature([{ name: Farm.name, schema: FarmModel }])],
	controllers: [FarmController],
	providers: [FarmService],
	exports: [FarmService],
})
export class FarmModule {}
