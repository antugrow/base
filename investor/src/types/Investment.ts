export enum InvestmentFarmCategory {
	ALL = "all",
	DAIRY = "dairy",
	POULTRY = "poultry",
	PIGS = "PIGS",
}

export interface IInvestment {
	_id: string;
	createdAt: string;
	updatedAt: string;
	amount: number;
	walletAddress: string;
	duration: number;
	category: InvestmentFarmCategory;
	transactionInfo?: Record<string, any>;
}
