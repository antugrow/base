import AdminNavbar from "@/components/layout/admin/AdminNavbar";
import AppLayoutWrapper from "./AppLayoutWrapper";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<AppLayoutWrapper>
			<div className="flex flex-col flex-1 transition-all">
				<AdminNavbar />
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

export default AdminLayout;
