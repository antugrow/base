import { Module } from "@nestjs/common";
import { InvestmentService } from "./investment.service";
import { InvestmentController } from "./investment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Investment, InvestmentModel } from "src/models/investment.model";

@Module({
	imports: [MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentModel }])],
	controllers: [InvestmentController],
	providers: [InvestmentService],
	exports: [InvestmentService],
})
export class InvestmentModule {}
