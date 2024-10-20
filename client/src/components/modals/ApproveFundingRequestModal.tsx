import { Button, useDisclosure } from "@nextui-org/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { IFunding } from "@/types/Funding";
import { IUser } from "@/types/User";
import { useState } from "react";
import useFundingUtils from "@/hooks/useFundingUtils";
import toast from "react-hot-toast";

interface IProps {
	mutate?: VoidFunction;
	request: IFunding;
}

const ApproveFundingRequestModal = ({ request, mutate }: IProps) => {
	const { isOpen, onOpenChange, onClose } = useDisclosure();
	const [loading, setLoading] = useState<boolean>(false);

	const { approveFundingRequest } = useFundingUtils();

	const onConfirm = async () => {
		setLoading(true);

		try {
			const resp = await approveFundingRequest(request._id);

			if (resp?.status === "success") {
				toast.success("Funding request approved successfully..");
				mutate && mutate?.();
				onClose();
			} else {
				toast.error("Unable to approve the funding request at the moment,try again later.");
			}
		} catch (err) {
			toast.error("Unable to approve the funding request at the moment,try again later.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>
				<Button size="sm" color="primary">
					Approve
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="antugrow font-nunito">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>This will approve the funding request for {(request.requestedBy as IUser).name} and remit fundings to their M-PESA Wallet.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button color="danger" size="sm" variant="flat">
							Cancel
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button size="sm" color="primary" onPress={onConfirm} isLoading={loading} isDisabled={loading}>
							Confirm
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ApproveFundingRequestModal;
