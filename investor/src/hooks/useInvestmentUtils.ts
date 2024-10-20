import { useCallback } from "react";
import { useApi } from "./useApi";
import { IInvestment } from "@/types/Investment";
import { IApiEndpoint, IApiResponse } from "@/types/Api";

const useInvestmentUtils = () => {
	const { post } = useApi();

	const saveNewInvestment = useCallback(
		async (data: Omit<IInvestment, "_id" | "createdAt" | "updatedAt">) => {
			const resp = await post<IApiResponse<IInvestment>>({ endpoint: IApiEndpoint.SAVE_NEW_INVESTMENT, data, checkAuth: false });

			return resp.data;
		},
		[post]
	);

	return { saveNewInvestment };
};

export default useInvestmentUtils;
