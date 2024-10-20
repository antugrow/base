import axiosClient from "@/lib/axios-client";
import { IMethodParams, RequestHeader, getEndpoint } from "@/types/Api";
import { useCallback } from "react";

export const useApi = () => {
	/**
	 * @param endpoint - The endpoint to call
	 * @param data - The data to send to the endpoint
	 * @param checkAuth - If true, the request will be sent with the firebase auth token
	 * @see `src/types/Api.ts` - Reference for all endpoints
	 * @example
	 * ```ts
	 * // for endpoints that require auth
	 * const { data } = await post({
	 *  endpoint: IAPIEndpoint.CREATE_USER,
	 *  data: { name: 'test' }
	 * });
	 * ```
	 * @example
	 * ```ts
	 * // for endpoints that don't require auth
	 * const { data } = await post({
	 *    endpoint: IAPIEndpoint.CREATE_USER,
	 *    data: { name: 'test' },
	 *    checkAuth: false
	 * });
	 * ```
	 */
	const post = useCallback(
		async <T = any>({ endpoint, data, checkAuth = true }: IMethodParams) =>
			axiosClient.post<T>(getEndpoint(endpoint), data, {
				headers: {
					"Content-Type": "application/json",
					[RequestHeader.AUTHORIZATION]: checkAuth,
				},
			}),
		[]
	);

	/**
	 * @param endpoint - The endpoint to call
	 * @param checkAuth - If true, the request will be sent with the firebase auth token
	 * @param signal - (optional) the abortcontroller signal used to handle cleanup of request in useEffects
	 * @param queryParams - (optional) any query parameters needed for the endpoints
	 * @see `src/types/Api` - Reference for all api endpoints
	 * @example
	 * ```ts
	 * // for endpoints that require auth
	 * const { data } = await get({
	 *    endpoint: IAPIEndpoint.USERS,
	 * });
	 * ```
	 * @example
	 * ```ts
	 * // for endpoints that don't require auth
	 * const { data } = await get({
	 *    endpoint: IAPIEndpoint.USERS,
	 *    checkAuth: false
	 * });
	 *
	 * ```
	 * @example
	 * ```ts
	 * // for endpoints that require query params
	 * const { data } = await get({
	 *    endpoint: IAPIEndpoint.USERS,
	 *    queryParams: {limit: 10},
	 *    checkAuth = false
	 * });
	 *
	 * ```
	 */

	// const get = useCallback(
	// 	async <T = any>({ endpoint, queryParams, signal, checkAuth = true, customHeaders={} }: IMethodParams) =>
	// 	 axiosClient.get<T>(getEndpoint(endpoint), {
	// 			params: queryParams,
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				[RequestHeader.AUTHORIZATION]: checkAuth,
	// 				...customHeaders
	// 			},
	// 			signal,
	// 		}),
	// 	[]
	// );

	const get = useCallback(async <T = any>({ endpoint, queryParams, signal, checkAuth = true }: IMethodParams) => {
		return axiosClient.get<T>(getEndpoint(endpoint), {
			params: queryParams,
			headers: {
				"Content-Type": "application/json",
				[RequestHeader.AUTHORIZATION]: checkAuth,
			},
			signal,
		});
	}, []);

	const put = useCallback(
		async <T = any>({ endpoint, data, checkAuth = true, queryParams }: IMethodParams) =>
			axiosClient.put<T>(getEndpoint(endpoint), data, {
				params: queryParams,
				headers: {
					[RequestHeader.AUTHORIZATION]: checkAuth,
				},
			}),
		[]
	);

	const patch = useCallback(
		async <T = any>({ endpoint, data, checkAuth = true, queryParams }: IMethodParams) =>
			axiosClient.patch<T>(getEndpoint(endpoint), data, {
				params: queryParams,
				headers: {
					[RequestHeader.AUTHORIZATION]: checkAuth,
				},
			}),
		[]
	);

	const del = useCallback(
		async <T = any>({ endpoint, checkAuth = true, queryParams, data }: IMethodParams) =>
			axiosClient.delete<T>(getEndpoint(endpoint), {
				params: queryParams,
				headers: {
					[RequestHeader.AUTHORIZATION]: checkAuth,
				},
				data,
			}),
		[]
	);

	return {
		post,
		get,
		put,
		patch,
		del,
	};
};
