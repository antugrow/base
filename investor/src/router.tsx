import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PortfolioLayout from "./layouts/PortfolioLayout";
import InvestorDashboard from "./pages/InvestorDashboard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "portfolio",
		element: <PortfolioLayout />,
		children: [
			{
				path: "",
				element: <InvestorDashboard />,
			},
		],
	},
]);

export default router;
