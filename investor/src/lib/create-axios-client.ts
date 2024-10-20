import { RequestHeader } from "@/types/Api";
import axios, { AxiosRequestConfig } from "axios";

interface CreateAxiosClientOptions {
	options?: AxiosRequestConfig;
	getAuthToken: () => string | null;
}

export function createAxiosClient({ options = {}, getAuthToken }: CreateAxiosClientOptions) {
	const client = axios.create(options);

	// create a request interceptor to add backend auth token to request header
	client.interceptors.request.use(
		(config) => {
			// ensure auth token header is not already set
			if (config.headers[RequestHeader.AUTHORIZATION] !== false) {
				const authToken = getAuthToken();
				if (authToken) {
					config.headers[RequestHeader.AUTHORIZATION] = `Bearer ${authToken}`;
				}
			}

			return config;
		},
		(error) => {
			console.log("createAxiosClient:error", error);
			return Promise.reject(error);
		}
	);

	return client;
}
