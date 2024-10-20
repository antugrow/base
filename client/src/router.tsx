import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./layouts/AuthLayout";
import FarmerLayout from "./layouts/FarmerLayout";
import FarmerDashboard from "./pages/farmer/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "auth",
		element: <AuthLayout />,
		children: [
			{
				path: "signin",
				element: <SignIn />,
			},
			{
				path: "signup",
				element: <SignUp />,
			},
		],
	},
	{
		path: "farmer",
		element: <FarmerLayout />,
		children: [
			{
				path: "",
				element: <FarmerDashboard />,
			},
		],
	},
	{
		path: "admin",
		element: <AdminLayout />,
		children: [
			{
				path: "",
				element: <AdminDashboard />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
