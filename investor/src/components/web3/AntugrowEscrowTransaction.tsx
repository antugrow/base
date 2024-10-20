import { useCallback } from "react";
import { Transaction, TransactionButton, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";
import type { LifeCycleStatus } from "@coinbase/onchainkit/transaction";
import { useAccount } from "wagmi";
import WalletConnection from "./WalletConnection";
import { baseSepolia } from "viem/chains";
import { antuEscrowContractAddress, mainContractAbi } from "@/utils/contracts";
import { ContractFunctionParameters } from "viem";
import { PAYMASTER_ENDPOINT } from "@/env";
import useInvestmentUtils from "@/hooks/useInvestmentUtils";
import { InvestmentFarmCategory } from "@/types/Investment";

interface IProps {
	amount: number;
}

const AntugrowEscrowTransaction = ({ amount }: IProps) => {
	const oneYearInMillisecs = 365 * 24 * 60 * 60 * 1000;
	const { address } = useAccount();

	const { saveNewInvestment } = useInvestmentUtils();

	const saveToDb = async (transactionInfo: any) => {
		const info = {
			amount,
			duration: 12,
			walletAddress: address!,
			category: InvestmentFarmCategory.ALL,
			transactionInfo,
		};

		try {
			const resp = await saveNewInvestment(info);
		} catch (err) {}
	};

	const handleOnStatus = useCallback((status: LifeCycleStatus) => {
		if (status.statusName === "success") {
			// save data to db
			saveToDb(status.statusData);
		}
	}, []);

	function preprocessAmount(val: number | string): number {
		const newVal = parseFloat(String(val));

		if (isNaN(newVal)) {
			return 0.0;
		}

		return newVal;
	}

	const contracts = [
		{
			address: antuEscrowContractAddress,
			abi: mainContractAbi as any,
			functionName: "createLoan",
			args: [preprocessAmount(amount), oneYearInMillisecs],
		},
	] satisfies ContractFunctionParameters[];

	return address ? (
		<Transaction
			chainId={baseSepolia.id}
			contracts={contracts}
			onStatus={handleOnStatus}
			capabilities={{
				paymasterService: {
					url: PAYMASTER_ENDPOINT,
				},
			}}>
			<TransactionButton text="Deposit" />
			<TransactionSponsor />
			<TransactionStatus>
				<TransactionStatusLabel />
				<TransactionStatusAction />
			</TransactionStatus>
		</Transaction>
	) : (
		<WalletConnection />
	);
};

export default AntugrowEscrowTransaction;
