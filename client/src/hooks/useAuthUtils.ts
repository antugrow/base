import { useCallback } from "react";
import { useApi } from "./useApi";
import { IApiEndpoint, IApiResponse } from "@/types/Api";
import { IUser } from "@/types/User";

type ICreateAccount = {
	name: string;
	phoneNo: string;
	password: string;
	role: string;
};

const useAuthUtils = () => {
	const { post } = useApi();

	const signIn = useCallback(
		async (phoneNo: string, password: string) => {
			const resp = await post<IApiResponse<{ userInfo: IUser; token: string }>>({ endpoint: IApiEndpoint.AUTH_SIGNIN, data: { phoneNo, password } });

			return resp.data;
		},
		[post]
	);

	const createAccount = useCallback(
		async (data: ICreateAccount) => {
			const resp = await post<IApiResponse>({ endpoint: IApiEndpoint.REGISTER, data });

			return resp.data;
		},
		[post]
	);

	return { signIn, createAccount };
};

export default useAuthUtils;
