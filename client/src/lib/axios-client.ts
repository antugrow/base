import { API_URL } from "@/env";
import { createAxiosClient } from "./create-axios-client";
import { useAuthStore } from "@/hooks/store/useAuthStore";

const axiosClient = createAxiosClient({
	options: {
		baseURL: API_URL,
		timeout: 30000,
		headers: {
			"Content-Type": "application/json",
		},
	},
	getAuthToken: () => {
		const session = useAuthStore.getState().getSession();

		if (!session?.user) {
			return null;
		}

		return session.user?.token!;
	},
});

export default axiosClient;