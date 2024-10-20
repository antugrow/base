import AcmeLogo from "@/components/layout/AcmeLogo";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8 saastain font-nunito">
			<div className="max-w-lg mx-auto text-center">
				<div className="pb-6">
					<Link to="/">
						<div className="flex items-center gap-2">
							<AcmeLogo />
						</div>
						<h1 className="font-bold text-lg">Antugrow</h1>
					</Link>
				</div>
				<h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">Page not found</h3>
				<p className="text-gray-600 mt-3">Sorry, the page you are looking for could not be found or has been removed.</p>
			</div>
		</div>
	);
};

export default NotFound;
