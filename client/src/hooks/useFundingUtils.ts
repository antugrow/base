import { useCallback } from "react";
import { useApi } from "./useApi";
import { IApiEndpoint, IApiResponse } from "@/types/Api";
import { IFunding } from "@/types/Funding";

type NewRequestItem = {
	amount: number;
	userId: string;
	reason: string;
};

const useFundingUtils = () => {
	const { post, put } = useApi();

	const newFundingRequest = useCallback(
		async (data: NewRequestItem) => {
			const resp = await post<IApiResponse<IFunding>>({ endpoint: IApiEndpoint.REQUEST_FOR_FUNDING, data });

			return resp.data;
		},
		[post]
	);

	const approveFundingRequest = useCallback(
		async (id: string) => {
			const resp = await put<IApiResponse<IFunding>>({ endpoint: `${IApiEndpoint.APPROVE_FUNDING_REQUEST}/${id}` as IApiEndpoint });

			return resp.data;
		},
		[put]
	);

	return { newFundingRequest, approveFundingRequest };
};

export default useFundingUtils;
