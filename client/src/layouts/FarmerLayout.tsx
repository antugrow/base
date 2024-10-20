import { Outlet } from "react-router-dom";
import AppLayoutWrapper from "./AppLayoutWrapper";
import FarmerNavbar from "@/components/layout/farmer/FarmerNavbar";

const FarmerLayout = () => {
	return (
		<AppLayoutWrapper>
			<div className="flex flex-col flex-1 transition-all">
				<FarmerNavbar />
				<div className="flex flex-1 flex-col md:flex-row">
					{/* Sidebar should go here */}
					<div className="flex flex-1 flex-col px-2 md:px-[30px] py-5 overflow-y-auto h-screen">
                        <Outlet />
                    </div>
				</div>
			</div>
		</AppLayoutWrapper>
	);
};

export default FarmerLayout;
