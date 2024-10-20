import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/models/user.model";
import * as argon2 from "argon2";
import { FarmService } from "src/farm/farm.service";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private readonly farmService: FarmService) {}

	async createUser(userInfo: User) {
		const existingUser = await this.userModel.findOne({ phoneNo: userInfo.phoneNo }).exec();

		if (existingUser) {
			throw new Error("User exists");
		}

		const hashedPassword = await argon2.hash(userInfo.password);

		const infoToSave = {
			...userInfo,
			password: hashedPassword,
		};

		try {
			const newUser = this.userModel.create(infoToSave);

			const savedUser = (await newUser).save();

			await this.saveFarmInfo((await savedUser)._id.toString());

			return (await savedUser).toObject();
		} catch (err) {
			throw new Error("User not saved");
		}
	}

	async getAllUsers() {
		return await this.userModel.find().select("-password").exec();
	}

	async getUserByPhoneNo(phoneNo: string) {
		return (await this.userModel.findOne({ phoneNo }).exec()).toObject();
	}

	async saveFarmInfo(_id: string) {
		try {
			await this.farmService.createFarm(_id);
		} catch (err) {}
	}

	async getFarmersUsers() {
		return await this.userModel.find({ role: "Farmer" }).exec();
	}

	async addDid(id: string, did: string) {
		return await this.userModel.findOneAndUpdate({ _id: id }, { did }).exec();
	}

	async getUserInfo(id: string) {
		return await this.userModel.findById(id).select("-password").exec();
	}
}
