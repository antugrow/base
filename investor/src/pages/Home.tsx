import WalletConnection from "@/components/web3/WalletConnection";
import HomeLayout from "@/layouts/HomeLayout";

const Home = () => {
	return (
		<HomeLayout>
			<section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
				<div className="text-center space-y-4">
					<h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
						Onchain Credit for Farmers
						<span className="text-indigo-600"> in Africa</span>
					</h1>
					<p className="text-gray-900 max-w-xl mx-auto leading-relaxed">
						Antugrow trains farmers, offers pre-prepared inputs, credit financing for inputs then tracks production with an insurance guarantee if crop failure happens.
					</p>
				</div>
				<div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
					<WalletConnection />
				</div>
			</section>
		</HomeLayout>
	);
};

export default Home;
