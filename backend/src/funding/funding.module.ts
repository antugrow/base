import { Module } from "@nestjs/common";
import { FundingService } from "./funding.service";
import { FundingController } from "./funding.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Funding, FundingModel } from "src/models/funding.model";

@Module({
	imports: [MongooseModule.forFeature([{ name: Funding.name, schema: FundingModel }])],
	controllers: [FundingController],
	providers: [FundingService],
	exports: [FundingService],
})
export class FundingModule {}
