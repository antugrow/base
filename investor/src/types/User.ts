export interface IUser {
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	location: string;
	phoneNo: string;
	role: string;
	token?: string;
}
