import { IUser } from "./User";

export enum FundingStatus {
	PENDING = "pending",
	IN_PROGRESS = "in-progress",
	APPROVED = "approved",
	REJECTED = "rejected",
}

export interface IFunding {
	_id: string;
	amount: number;
	requestedBy: string | IUser;
	status: FundingStatus;
	reason: string;
	approvedBy?: string | IUser;
    createdAt: string;
    updatedAt: string
}
