import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { issueCredential } from "src/lib/did";
import { Badge } from "src/models/badge.model";

@Injectable()
export class BadgeService {
	constructor(@InjectModel(Badge.name) private readonly badgeModel: Model<Badge>) {}

	async issueBadge(data: { title: string; farmerId: string; issuererId: string }) {
		let myCreds = await issueCredential();

		let info = {
			title: data.title,
			issuedBy: data.issuererId,
			issuedTo: data.farmerId,
			credential: myCreds.creds,
		};

		const newBadge = await this.badgeModel.create(info);

		await newBadge.save();
	}

	async getAllBadges() {
		return await this.badgeModel.find({}).populate("issuedTo").exec();
	}

	async getFarmerBadges(farmerId: string) {
		return await this.badgeModel.find({ issuedTo: farmerId }).exec();
	}
}
