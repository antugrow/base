import AddNewAnimalModal from "@/components/modals/AddNewAnimalModal";
import RequestForFundingModal from "@/components/modals/RequestForFundingModal";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { swrFetcher } from "@/lib/api-client";
import { IAnimal } from "@/types/Animal";
import { IApiEndpoint } from "@/types/Api";
import { IFunding } from "@/types/Funding";
import { IUser } from "@/types/User";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Tab, Tabs } from "@nextui-org/react";
import { format, formatDistance } from "date-fns";
import { PiggyBankIcon } from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";

const FarmerDashboard = () => {
	const { session } = useAuthStore();

	const account = useMemo(() => {
		if (session?.user) return session?.user;

		return null;
	}, [session]);
	const { data: animals, mutate: refetchAnimals } = useSWR<IAnimal[]>(!account ? null : [`${IApiEndpoint.ANIMALS_BY_OWNER}/${account?._id}`], swrFetcher, { keepPreviousData: true });

	const { data: creds } = useSWR<{ title: string; issuedTo: IUser; credential: object; _id: string; createdAt: string }[]>(!account ? null : [`${IApiEndpoint.GET_ALL_CREDS_FARMER}/${account?._id}`], swrFetcher, {
		keepPreviousData: true,
	});

	const { data: fundingRequests, mutate: refetchRequests } = useSWR<IFunding[]>(!account ? null : [`${IApiEndpoint.GET_FARMER_FUNDING_REQUESTS}/${account?._id}`], swrFetcher, { keepPreviousData: true });

	return (
		<>
			<Tabs aria-label="Options">
				<Tab key="home" title="Dashboard">
					<div className="grid grid-cols-2 gap-2">
						<Card>
							<CardHeader>Credit Score</CardHeader>
							<CardBody>450</CardBody>
						</Card>
						<Card>
							<CardHeader>Badges Issued</CardHeader>
							<CardBody>{creds?.length ?? 0}</CardBody>
						</Card>
						<Card>
							<CardHeader>Crops</CardHeader>
							<CardBody>{animals?.length ?? 0}</CardBody>
						</Card>
					</div>
				</Tab>
				<Tab key="animals" title="My Farm">
					<div className="flex items-center w-full justify-between mb-4">
						<h2 className="font-bold text-lg">Crops Farmed</h2>
						<AddNewAnimalModal mutate={refetchAnimals} />
					</div>
					<div className="grid grid-cols-2 gap-2">
						{animals &&
							animals?.length > 0 &&
							animals?.map((item) => (
								<Card key={item?._id}>
									<CardHeader>
										<div className="flex items-center justify-center w-full">
											<Avatar showFallback src="https://images.unsplash.com/broken" fallback={<PiggyBankIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={20} />} />
										</div>
									</CardHeader>
									<CardBody>
										<div className="flex items-center justify-between">
											<h3 className="font-bold">Breed</h3>
											<p className="text-sm">{item?.breed}</p>
										</div>
										<div className="flex items-center justify-between">
											<h3 className="font-bold">Age</h3>
											<p className="text-sm">{formatDistance(item?.birth_date, new Date())}</p>
										</div>
									</CardBody>
								</Card>
							))}
					</div>
				</Tab>
				<Tab key="badges" title="Badges">
					<div className="flex items-center justify-between w-full mb-4">
						<h2 className="font-bold text-lg">Badges Earned</h2>
					</div>
					<div className="space-y-4">
						{creds &&
							creds?.length > 0 &&
							creds?.map((item) => (
								<Card>
									<CardHeader>{item?.title}</CardHeader>
									<Divider />
									<CardBody>
										<p>Badge Issued for:</p>
										<div className="flex items-center gap-2 mt-2">
											<Chip size="sm">{item.title}</Chip>
										</div>
									</CardBody>
									<Divider />
									<CardFooter>
										<p className="italic text-sm">Issued on {format(item?.createdAt, "PPP")}</p>
									</CardFooter>
								</Card>
							))}
					</div>
				</Tab>
				<Tab key="funding" title="Funding">
					<div className="flex items-center justify-between w-full mb-4">
						<h2 className="font-bold text-lg">Funding Requested</h2>
						<RequestForFundingModal mutate={refetchRequests} />
					</div>
					<div className="space-y-4">
						{fundingRequests &&
							fundingRequests?.length > 0 &&
							fundingRequests?.map((request, idx) => (
								<Card>
									<CardHeader>Funding Request #{idx + 1}</CardHeader>
									<Divider />
									<CardBody className="space-y-3">
										<div className="flex items-center justify-between">
											<p>Reason for Funding:</p>
											<p className="text-sm text-gray-600">{request?.reason}</p>
										</div>
										<div className="flex items-center justify-between">
											<h1 className="font-bold">
												Amount: <span className="font-normal">Ksh {request.amount}</span>
											</h1>
											<Chip size="sm" color="primary">
												{request?.status}
											</Chip>
										</div>
									</CardBody>
									<Divider />
									<CardFooter>
										<p className="italic text-sm">Requested on {format(new Date(request?.createdAt), "PPP")}</p>
									</CardFooter>
								</Card>
							))}
					</div>
				</Tab>
			</Tabs>
		</>
	);
};

export default FarmerDashboard;
