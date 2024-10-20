import { IApiEndpoint, IMethodParams, getEndpoint, IApiResponse, RequestHeader } from "@/types/Api";
import axiosClient from "./axios-client";

/**
 * @description - This is the api client that will be used to make requests to the backend specifically for the auth module
 */
export const apiClient = {
	/**
	 * @param endpoint - The endpoint to call
	 * @param data - The data to send to the endpoint
	 * @param checkAuth - If true, the request will be sent with the firebase auth token
	 * @example
	 * ```ts
	 * // for endpoints that require auth
	 * const { data } = await post({
	 *  endpoint: 'user/1',
	 *  data: { name: 'test' }
	 * });
	 * ```
	 * @example
	 * ```ts
	 * // for endpoints that don't require auth
	 * const { data } = await post({
	 *    endpoint: 'user/1',
	 *    data: { name: 'test' },
	 *    checkAuth: false
	 * });
	 * ```
	 */
	post: async <T = any>({ endpoint, data, checkAuth = true }: IMethodParams) =>
		axiosClient.post<T>(getEndpoint(endpoint), data, {
			headers: {
				"Content-Type": "application/json",
				[RequestHeader.AUTHORIZATION]: checkAuth,
			},
		}),

	/**
	 * @param endpoint - The endpoint to call
	 * @param checkAuth - If true, the request will be sent with the firebase auth token
	 * @param signal - (optional) the abortcontroller signal used to handle cleanup of request in useEffects
	 * @param queryParams - (optional) any query parameters needed for the endpoints
	 * @example
	 * ```ts
	 * // for endpoints that require auth
	 * const { data } = await get({
	 *    endpoint: 'user/1',
	 * });
	 * ```
	 * @example
	 * ```ts
	 * // for endpoints that don't require auth
	 * const { data } = await get({
	 *    endpoint: 'user/1',
	 *    checkAuth: false
	 * });
	 *
	 * ```
	 * @example
	 * ```ts
	 * // for endpoints that require query params
	 * const { data } = await get({
	 *    endpoint: 'users/',
	 *    queryParams: {limit: 10},
	 *    checkAuth = false
	 * });
	 *
	 * ```
	 */
	get: async <T = any>({ endpoint, queryParams, signal, checkAuth = true, customHeaders = {} }: IMethodParams) =>
		axiosClient.get<T>(getEndpoint(endpoint), {
			params: queryParams,
			headers: {
				"Content-Type": "application/json",
				[RequestHeader.AUTHORIZATION]: checkAuth,
				...customHeaders,
			},
			signal,
		}),
};

/**
 *
 * @param args - The arguments to pass to the api client, Usually useSWR hook does this for us,
 *
 * @description - How it works: I've no idea how this works, but it works 😂
 * @example
 * ```ts
 * const { data } = useSWR<T>('/user/1', swrFetcher);
 * ```
 * @example
 * ```ts
 * const { data } = useSWR<T>(['/user/1', {limit: 10}], swrFetcher);
 * ```
 */
export const swrFetcher = async (...args: Parameters<typeof apiClient.get>) => {
	const itemsInArr = args[0];
	let url = "" as unknown as IApiEndpoint; // this is just to make typescript happy 😂 and will be resolved by the apiClient to correct url path
	let params = {};
	if (typeof itemsInArr === "string") {
		// if the first item in the array is a string, then it's the url without query params
		url = itemsInArr as unknown as IApiEndpoint;
	} else {
		// if the first item in the array is an object, then it's the url with query params
		// @ts-ignore
		url = itemsInArr[0] as unknown as IApiEndpoint;
		// @ts-ignore
		params = itemsInArr[1] as unknown as Record<string, unknown>;
	}
	try {
		const resp = await apiClient.get<IApiResponse>({
			endpoint: url,
			queryParams: params,
		});

		const respInfo = resp.data;

		if (respInfo.status === "success") {
			return respInfo.data;
		}

		throw new Error(respInfo.msg);
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
};
