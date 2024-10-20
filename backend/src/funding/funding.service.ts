import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Funding, FundingStatus } from "src/models/funding.model";

@Injectable()
export class FundingService {
	constructor(@InjectModel(Funding.name) private readonly fundingModel: Model<Funding>) {}

	async newRequest(info: { amount: number; userId: string; reason: string }) {
		const myInfo = {
			amount: info.amount,
			requestedBy: info.userId,
			reason: info.reason,
		};
		const newInfo = this.fundingModel.create(myInfo);

		try {
			const savedInfo = (await newInfo).save();

			return (await savedInfo).toObject();
		} catch (err) {
			throw new Error("An error occurred");
		}
	}

	async getAllRequests() {
		return await this.fundingModel.find({}).populate("requestedBy").exec();
	}

	async getMyRequests(userId: string) {
		return await this.fundingModel.find({ requestedBy: userId }).exec();
	}

	async getRequestInfo(id: string) {
		return await this.fundingModel.findById(id).populate(["requestedBy", "approvedBy"]).exec();
	}

	async approveRequest(id: string) {
		const updatedReq = await this.fundingModel.findOneAndUpdate({ _id: id }, { status: FundingStatus.APPROVED });

		return updatedReq;
	}
}
