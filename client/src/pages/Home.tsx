import HomeLayout from "@/layouts/HomeLayout";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<HomeLayout>
			<section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
				<div className="text-center space-y-4">
					<h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
						Empower Farmers
						<span className="text-indigo-600"> in Africa</span>
					</h1>
					<p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
						Join Antugrow in transforming the lives of farmers across Africa. Discover how your investment can drive change, boost livelihoods, and create a brighter future for rural communities.
					</p>
				</div>
				<div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
					<Link to="/auth/signup" className="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto">
						Get started
					</Link>
					<Link to="/auth/signin" className="px-10 py-3.5 w-full text-gray-500 text-center border rounded-md duration-300 hover:text-indigo-600 hover:shadow block sm:w-auto">
						Sign In
					</Link>
				</div>
			</section>
		</HomeLayout>
	);
};

export default Home;
