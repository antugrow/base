import { Outlet } from "react-router-dom";
import AppLayoutWrapper from "./AppLayoutWrapper";

const AuthLayout = () => {
	return (
		<AppLayoutWrapper>
			<div className="w-full h-screen flex flex-col items-center justify-center px-4">
				<div className="max-w-sm w-full text-gray-600 space-y-5">
					<Outlet />
				</div>
			</div>
		</AppLayoutWrapper>
	);
};

export default AuthLayout;
