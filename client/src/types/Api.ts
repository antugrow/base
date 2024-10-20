export enum RequestHeader {
	AUTHORIZATION = "Authorization",
}

interface IApiSuccessResponse<T> {
	status: "success";
	msg: string;
	data?: T;
}
interface IApiErrorResponse {
	status: "error" | "failure" | "not-ready";
	msg: string;
}

export type IApiResponse<T = any> = IApiSuccessResponse<T> | IApiErrorResponse;

export const enum IApiEndpoint {
	AUTH_SIGNIN = "auth/signin",
	REGISTER = "users",
	FARMERS = "users/farmers",

	ANIMALS = "animals",
	ANIMALS_BY_OWNER = "animals/owner",
	ANIMALS_STATS = "animals/stats/count",

	ISSUE_CREDENTIAL = "badges",
	GET_ALL_CREDS = "badges",
	GET_ALL_CREDS_FARMER = "badges/farmer",

	GET_FARMER_FUNDING_REQUESTS = "funding/my-requests",
	REQUEST_FOR_FUNDING = "funding",
	FUNDING_REQUESTS = "funding",
	APPROVE_FUNDING_REQUEST = "funding/approve"
}
export interface IMethodParams {
	endpoint: IApiEndpoint;
	queryParams?: Object;
	signal?: AbortSignal;
	data?: any;
	checkAuth?: boolean;
	customHeaders?: Record<string, string>;
}

export const getEndpoint = (endpoint: IApiEndpoint) => `/${endpoint}`;
