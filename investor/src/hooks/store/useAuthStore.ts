import { IUser } from "@/types/User";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ISession {
	user: IUser | null;
}

export interface IAuthStore {
	session: ISession | null;
	logout: () => void;
	addUserSession: (user: IUser | null) => void;
	getSession: () => ISession | null;
}

export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			session: {
				user: null,
			},
			logout() {
				set({ session: { user: null } });
			},
			addUserSession(user) {
				const session = {
					user,
				};

				set({ session });
			},
			getSession() {
				return get().session;
			},
		}),
		{
			storage: createJSONStorage(() => localStorage),
			name: "antugrow-authstore",
		}
	)
);
