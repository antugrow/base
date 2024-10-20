import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from "@nextui-org/react";
import AppSelect from "../forms/AppSelect";
import { generateOptions } from "@/utils";
import useSWR from "swr";
import { IUser } from "@/types/User";
import { IApiEndpoint } from "@/types/Api";
import { swrFetcher } from "@/lib/api-client";
import { FC, useMemo, useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useBackendUtils from "@/hooks/useBackendUtils";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import toast from "react-hot-toast";

const badgeTypes = ["Farm Registration Badge", "Breeding Badge", "Health Badge", "Nutrition & Feeding Badge"];

const formSchema = z.object({
	selectedFarmer: z.string().min(1, "Select One"),
	badgeType: z.string().min(1, "Required"),
});

interface IProps {
	mutate?: VoidFunction;
}

const IssueBadgeModal: FC<IProps> = ({ mutate }) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { data: farmers } = useSWR<IUser[]>([IApiEndpoint.FARMERS], swrFetcher, { keepPreviousData: true });

	const farmerOpts = useMemo(() => {
		if (farmers && farmers?.length) {
			return farmers?.map((item) => {
				return {
					label: item.name,
					value: item.name,
				};
			});
		}
		return [];
	}, [farmers]);

	const formMethods = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			selectedFarmer: "",
			badgeType: "",
		},
	});

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors: formErrors },
	} = formMethods;

	const { session } = useAuthStore();

	const { issueCredential } = useBackendUtils();

	const onSubmit = handleSubmit(async (data) => {
		const selectedFarmerItem = farmers?.find((item) => item.name === data.selectedFarmer);

		let info = {
			title: data.badgeType,
			farmerId: selectedFarmerItem?._id!,
			issuererId: session?.user?._id!,
		};

		setIsLoading(true);

		try {
			const resp = await issueCredential(info);

			if (resp?.status === "success") {
				toast.success("Verifiable Credentials Generated Successfully");
				reset();
				mutate && mutate?.();
				onClose();
			} else {
				toast.error("Unable to generate Verifiable Credentials");
			}
		} catch (err) {
			toast.error("Unable to generate Verifiable Credentials");
		} finally {
			setIsLoading(false);
		}
	});

	return (
		<>
			<Button size="sm" color="primary" onPress={onOpen}>
				Issue Badge
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="antugrow font-nunito">
					{(onClose) => (
						<FormProvider {...formMethods}>
							<form onSubmit={onSubmit}>
								<ModalHeader>Issue New Badge</ModalHeader>
								<ModalBody>
									<AppSelect name="selectedFarmer" control={control} error={formErrors.selectedFarmer} label={"Farmer"} options={farmerOpts} placeholder="Choose ..." />
									<Spacer y={2} />
									<AppSelect label={"Badge Type"} name="badgeType" control={control} error={formErrors.badgeType} options={generateOptions(badgeTypes)} placeholder="Choose ..." />
									<Spacer y={2} />
								</ModalBody>
								<ModalFooter>
									<Button size="sm" variant="flat" color="danger" onPress={onClose} type="button">
										Cancel
									</Button>
									<Button size="sm" color="primary" type="submit" isLoading={isLoading} isDisabled={isLoading}>
										Submit
									</Button>
								</ModalFooter>
							</form>
						</FormProvider>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default IssueBadgeModal;
