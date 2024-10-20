import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { AlertCircle, RefreshCw, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AntugrowEscrowTransaction from "@/components/web3/AntugrowEscrowTransaction";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const overviewData = [
	{ month: "Jan", value: 200000 },
	{ month: "Feb", value: 210000 },
	{ month: "Mar", value: 225000 },
	{ month: "Apr", value: 235000 },
	{ month: "May", value: 245000 },
	{ month: "Jun", value: 250000 },
];

const portfolioData = [
	{ name: "Coffee", value: 66818 },
	{ name: "Maize", value: 32250 },
	{ name: "Sorghum", value: 11200 },
	{ name: "Tea", value: 40289 },
];

const loanPerformanceData = [
	{ month: "Jan", disbursed: 30, repaid: 28 },
	{ month: "Feb", disbursed: 35, repaid: 33 },
	{ month: "Mar", disbursed: 40, repaid: 38 },
	{ month: "Apr", disbursed: 50, repaid: 47 },
	{ month: "May", disbursed: 45, repaid: 43 },
	{ month: "Jun", disbursed: 50, repaid: 48 },
];

const OverviewTab = () => (
	<div className="space-y-6">
		<div className="grid grid-cols-3 gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Total Invested</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">$250,000</p>
					<p className="text-green-600">+15% from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Default Rate</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-green-600">15% APY</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Active Loans</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">78</p>
					<p>Across 3 farm categories</p>
				</CardContent>
			</Card>
		</div>
		<Card>
			<CardHeader>
				<CardTitle>Investment Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={overviewData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="value" stroke="#8884d8" name="Total Investment Value ($)" />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	</div>
);

const DepositTab = () => {
	const [amount, setAmount] = useState<number>(0);

	return (
		<div className="space-y-6">
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Security Notice</AlertTitle>
				<AlertDescription>Always verify the deposit address. We never change our deposit address via email or phone.</AlertDescription>
			</Alert>
			<Card>
				<CardHeader>
					<CardTitle>Deposit Crypto for Funding Farmers</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<label className="block mb-2">Amount</label>
							<div className="flex">
								<Input value={amount} onChange={(e) => setAmount(e.target.value as unknown as number)} />
							</div>
							<AntugrowEscrowTransaction amount={amount} />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const PortfolioTab = () => (
	<div className="space-y-6">
		<Card>
			<CardHeader>
				<CardTitle>Portfolio Allocation</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie dataKey="value" data={portfolioData} fill="#8884d8" label>
							{portfolioData.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Active Crops</CardTitle>
			</CardHeader>
			<CardContent>
				<table className="w-full">
					<thead>
						<tr>
							<th>Farm Category</th>
							<th>Amount Invested</th>
							<th>Expected Return</th>
							<th>Duration</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Coffee</td>
							<td>$66,818</td>
							<td>16% APY</td>
							<td>12 months</td>
						</tr>
						<tr>
							<td>Maize</td>
							<td>$32,250</td>
							<td>14% APY</td>
							<td>9 months</td>
						</tr>
						<tr>
							<td>Sorghum</td>
							<td>$11,200</td>
							<td>15% APY</td>
							<td>6 months</td>
						</tr>
						<tr>
							<td>Tea</td>
							<td>$40,289</td>
							<td>15% APY</td>
							<td>8 months</td>
						</tr>
					</tbody>
				</table>
			</CardContent>
		</Card>
		<div className="flex justify-between">
			<Button onClick={() => alert("Reinvestment feature coming soon!")}>
				<RefreshCw className="mr-2 h-4 w-4" /> Reinvest Returns
			</Button>
			<Button variant="outline" onClick={() => alert("Withdrawal feature coming soon!")}>
				<LogOut className="mr-2 h-4 w-4" /> Withdraw Funds
			</Button>
		</div>
	</div>
);

const LoanPerformanceTab = () => (
	<div className="space-y-6">
		<Card>
			<CardHeader>
				<CardTitle>Loan Performance</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={loanPerformanceData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="disbursed" fill="#8884d8" name="Loans Disbursed" />
						<Bar dataKey="repaid" fill="#82ca9d" name="Loans Repaid" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Key Metrics</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					Default Rate: <strong>1.2%</strong>
				</p>
				<p>
					Average Loan Duration: <strong>8 months</strong>
				</p>
				<p>
					Total Loans Funded: <strong>250</strong>
				</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Loan Processing Efficiency</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					Average time from deposit to loan disbursement: <strong>2 business days</strong>
				</p>
				<p>
					Smart contract automation reduces manual processing by <strong>85%</strong>
				</p>
			</CardContent>
		</Card>
	</div>
);

const InvestorDashboard = () => {
	return (
		<div className="p-6 space-y-6 bg-gray-100">
			<h1 className="text-3xl font-bold text-green-700 mb-4">Antugrow Investor Dashboard</h1>

			<Tabs defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="deposit">Deposit</TabsTrigger>
					<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
					<TabsTrigger value="loanPerformance">Loan Performance</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<OverviewTab />
				</TabsContent>
				<TabsContent value="deposit">
					<DepositTab />
				</TabsContent>
				<TabsContent value="portfolio">
					<PortfolioTab />
				</TabsContent>
				<TabsContent value="loanPerformance">
					<LoanPerformanceTab />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default InvestorDashboard;
