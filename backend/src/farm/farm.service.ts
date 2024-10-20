import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Farm } from "src/models/farm.model";

@Injectable()
export class FarmService {
	constructor(@InjectModel(Farm.name) private readonly farmModel: Model<Farm>) {}

	async createFarm(ownerId: string) {
		const newFarm = this.farmModel.create({ owner: ownerId });

		try {
			const savedFarm = (await newFarm).save();

			return (await savedFarm).toObject();
		} catch (err) {
			throw new Error("Unable to save farm");
		}
	}
}
