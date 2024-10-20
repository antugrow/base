import { useCallback } from "react";
import { useApi } from "./useApi";
import { IApiEndpoint, IApiResponse } from "@/types/Api";

interface IAddAnimalData {
	breed: string;
	birth_date: string;
	owner: string;
	weight: string;
}

interface IIssueCredData {
	title: string;
	farmerId: string;
	issuererId: string;
}

const useBackendUtils = () => {
	const { post } = useApi();

	const addAnimal = useCallback(
		async (data: IAddAnimalData) => {
			const resp = await post<IApiResponse>({ endpoint: IApiEndpoint.ANIMALS, data });

			return resp.data;
		},
		[post]
	);

	const issueCredential = useCallback(
		async (data: IIssueCredData) => {
			const resp = await post<IApiResponse>({ endpoint: IApiEndpoint.ISSUE_CREDENTIAL, data });

			return resp.data;
		},
		[post]
	);

	return { addAnimal, issueCredential };
};
export default useBackendUtils;
