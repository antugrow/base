import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import AppInput from "../forms/AppInput";
import AppTextArea from "../forms/AppTextArea";
import { useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import useFundingUtils from "@/hooks/useFundingUtils";
import toast from "react-hot-toast";

const formSchema = z.object({
	amount: z.coerce.number().min(1, "Amount is required"),
	reason: z.string().min(1, "Reason is required"),
});

interface IProps {
	mutate?: VoidFunction;
}

const RequestForFundingModal = ({ mutate }: IProps) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [loading, setLoading] = useState<boolean>(false);

	const formMethods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 1,
			reason: "",
		},
	});

	const { session } = useAuthStore();
	const { newFundingRequest } = useFundingUtils();

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors: formErrors },
	} = formMethods;

	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);
		const info = {
			amount: data.amount,
			reason: data.reason,
			userId: session?.user?._id!,
		};

		try {
			const resp = await newFundingRequest(info);

			if (resp?.status === "success") {
				toast.success("Funding Requested Successfully ...");
				reset();
				mutate && mutate?.();
				onClose;
			} else {
				toast.error("Unable to apply for the funding at the moment");
			}
		} catch (err) {
			toast.error("Unable to apply for the funding at the moment");
		} finally {
			setLoading(false);
		}
	});

	return (
		<>
			<Button onPress={onOpen} size="sm" color="primary">
				Request for Funding
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="antugrow font-nunito">
					{(onClose) => (
						<>
							<FormProvider {...formMethods}>
								<form onSubmit={onSubmit}>
									<ModalHeader>Request for Funding</ModalHeader>
									<ModalBody>
										<AppInput label={"Amount (Ksh)"} placeholder="500" name="amount" type="number" control={control} error={formErrors.amount} />
										<AppTextArea label="Reason" placeholder="e.g. For buying feeds" name="reason" control={control} error={formErrors.reason} />
									</ModalBody>
									<ModalFooter>
										<Button size="sm" variant="flat" color="danger" onPress={onClose} type="button">
											Cancel
										</Button>
										<Button size="sm" color="primary" type="submit" isLoading={loading} isDisabled={loading}>
											Request
										</Button>
									</ModalFooter>
								</form>
							</FormProvider>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default RequestForFundingModal;
