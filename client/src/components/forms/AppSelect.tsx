import { ChangeEvent, ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Chip, Select as NextSelect, SelectItem as NextSelectItem, SelectedItems } from "@nextui-org/react";
import { IOption } from "@/types/Forms";
import { capitalize } from "@/utils";

interface AppSelectProps {
	name?: string;
	label: ReactNode;
	value?: string;
	setValue?: (value: string) => void;
	isRequired?: boolean;
	error?: FieldError;
	helperText?: string;
	options: (IOption | string)[];
	control?: Control<any>;
	placeholder?: string;
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
	customRender?: (items: SelectedItems<IOption | string>) => ReactNode;
	baseClassName?: string;
	onSelectAction?: VoidFunction;
}

const AppSelect = ({
	name,
	label,
	value,
	setValue,
	isRequired = false,
	error,
	helperText,
	options,
	control,
	placeholder = "Select an Option",
	onChange,
	customRender = undefined,
	baseClassName,
	onSelectAction,
}: AppSelectProps) => {
	const getOptionItem = (item: (typeof options)[0]) => {
		const isValue = typeof item === "string";

		const v = isValue ? item : item?.value;
		const l = isValue ? item : item?.label ?? item?.value;

		return { value: v, label: l };
	};

	return control ? (
		<Controller
			control={control}
			name={name!}
			render={({ field: { onChange: onControlledChange, value: controlledValue } }) => (
				<NextSelect
					label={label}
					value={controlledValue}
					onChange={(val) => {
						onControlledChange(val);
						onSelectAction && onSelectAction();
					}}
					description={helperText}
					isInvalid={!!error}
					errorMessage={error?.message}
					size="md"
					variant="bordered"
					labelPlacement="outside"
					color="primary"
					placeholder={placeholder}
					items={options as any}
					classNames={{
						label: "text-sm font-medium text-primary",
						popoverContent: "antugrow font-nunito",

						base: baseClassName,
					}}
					renderValue={(items) =>
						customRender ? (
							customRender(items as any)
						) : (
							<div className="flex flex-wrap gap-2">
								{items.map((item) => (
									<Chip color="primary" key={item.key} className="text-[12px]" size="sm">
										{item.key as string}
									</Chip>
								))}
							</div>
						)
					}>
					{(item) => {
						const opt = getOptionItem(item as any);

						return (
							<NextSelectItem key={opt?.value ?? "new-key"} value={opt.value}>
								{opt.label}
							</NextSelectItem>
						);
					}}
				</NextSelect>
			)}
		/>
	) : (
		<NextSelect
			label={label}
			value={value}
			onSelectionChange={(val) => {
				setValue && setValue(val as any);
				onSelectAction && onSelectAction();
			}}
			onChange={(val) => {
				onChange && onChange(val);
				onSelectAction && onSelectAction();
			}}
			description={helperText}
			isInvalid={!value && isRequired}
			errorMessage={!value && isRequired ? `${label} is required` : undefined}
			size="md"
			variant="bordered"
			labelPlacement="outside"
			color="primary"
			placeholder={value ? capitalize(value) : placeholder}
			classNames={{
				label: "text-sm font-medium text-primary",
				popoverContent: "antugrow font-nunito",
				base: baseClassName,
			}}
			items={options as any}
			renderValue={(items) =>
				customRender ? (
					customRender(items as any)
				) : (
					<div className="flex flex-wrap gap-2">
						{items.map((item) => (
							<Chip color="primary" key={item?.key ?? "new-key"} className="text-[12px]" size="sm">
								{item.key as string}
							</Chip>
						))}
					</div>
				)
			}>
			{(item) => {
				const opt = getOptionItem(item as any);
				return (
					<NextSelectItem key={opt.value} value={opt.value}>
						{opt.label}
					</NextSelectItem>
				);
			}}
		</NextSelect>
	);
};

export default AppSelect;
