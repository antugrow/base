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
	SAVE_NEW_INVESTMENT = "investments/new",
	GET_ALL_INVESTMENTS = "investments/get/by-wallet"
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
