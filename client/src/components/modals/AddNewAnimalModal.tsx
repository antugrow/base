import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from "@nextui-org/react";
import AppInput from "../forms/AppInput";
import AppSelect from "../forms/AppSelect";
import { generateOptions } from "@/utils";
import AppDatePicker from "../forms/AppDatePicker";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sub } from "date-fns";
import useBackendUtils from "@/hooks/useBackendUtils";
import { FC, useState } from "react";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import toast from "react-hot-toast";

const pigBreeds = ["Yorkshire", "Duroc", "Landrace", "Berkshire", "Hampshire", "Tamworth", "Large White", "Pietrain", "Kune Kune", "Mangalitsa"];

const formSchema = z.object({
	breed: z.string().min(1, "Breed is required"),
	birth_date: z.date(),
	weight: z.string().min(1, "Weight is requred"),
});

interface IProps {
	mutate?: Function
}

const AddNewAnimalModal: FC<IProps> = ({mutate}) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [loading, setLoading] = useState<boolean>(false);

	const formMethods = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			breed: "",
			birth_date: sub(new Date(), { months: 4 }),
			weight: "",
		},
	});

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = formMethods;

	const { addAnimal } = useBackendUtils();
	const { session } = useAuthStore();

	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);
		const info = {
			...data,
			owner: session?.user?._id!,
			birth_date: new Date(data.birth_date).toISOString(),
		};
		try {
			const resp = await addAnimal(info);

			if (resp.status === "success") {
				toast.success("Saved successfully");
				reset();
				mutate && mutate?.()
				onClose();
			} else {
				toast.error("Failed to save");
			}
		} catch (err) {
			toast.error("Failed to save");
		} finally {
			setLoading(false);
		}
	});

	return (
		<>
			<Button size="sm" color="primary" onPress={onOpen}>
				Add
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="antugrow font-nunito">
					{(onClose) => (
						<FormProvider {...formMethods}>
							<form onSubmit={onSubmit}>
								<ModalHeader>Add Pig</ModalHeader>
								<ModalBody>
									<AppSelect name="breed" control={control} error={errors.breed} label={"Breed"} placeholder="Choose ..." options={generateOptions(pigBreeds)} />
									<Spacer y={2} />
									<AppDatePicker name="birth_date" control={control} error={errors.birth_date} label="Date of Birth" />
									<Spacer y={2} />
									<AppInput name="weight" control={control} error={errors.weight} label={"Current Weight"} placeholder="50 kg" />
								</ModalBody>
								<ModalFooter>
									<Button size="sm" type="button" variant="flat" color="danger" onPress={onClose}>
										Cancel
									</Button>
									<Button size="sm" color="primary" type="submit" isLoading={loading} isDisabled={loading}>
										Save
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

export default AddNewAnimalModal;
