import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Investment } from "src/models/investment.model";
import { Model } from "mongoose";
import { CreateInvestmentDto } from "./dto/create-investment.dto";

@Injectable()
export class InvestmentService {
	constructor(@InjectModel(Investment.name) private readonly investmentModel: Model<Investment>) {}

	async newInvestment(info: CreateInvestmentDto) {
		const newInfo = this.investmentModel.create(info);
		try {
			const savedInfo = (await newInfo).save();

			return (await savedInfo).toObject();
		} catch (err) {
			throw new Error("Unable to save the investment information");
		}
	}

	async getAllInvestmentByWalletAddress(walletAddress: string) {
		return await this.investmentModel.find({ walletAddress }).exec();
	}

	async getAllInvestments() {
		return await this.investmentModel.find({}).exec();
	}

  async getInvestmentInfo(id: string){
    return await this.investmentModel.findById(id).exec()
  }
  
}
