import { NOOP } from "@/helpers";
import { IOption } from "@/types/Forms";
import { Radio, RadioGroup, RadioGroupProps } from "@nextui-org/react";
import { useCallback } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface AppRadioGroupProps extends RadioGroupProps {
	name?: string;
	label: string;
	value?: string;
	setValue?: (value: string) => void;
	isRequired?: boolean;
	error?: FieldError;
	helperText?: string;
	options: (IOption | string)[];
	orientation?: "horizontal" | "vertical";
	control?: Control<any>;
}

const AppRadioGroup = ({ name, label, setValue = NOOP, value, isRequired, error, helperText, options, orientation = "vertical", onChange, control }: AppRadioGroupProps) => {
	const getOptionItem = useCallback((item: (typeof options)[0]) => {
		const isValue = typeof item === "string";

		const v = isValue ? item : item?.value;
		const l = isValue ? item : item?.label ?? item?.value;

		return { value: v, label: l };
	}, []);

	return control ? (
		<Controller
			control={control}
			name={name!}
			render={({ field: { onChange: onControlledChange, value: changedValue } }) => (
				<RadioGroup
					label={label}
					value={changedValue}
					description={helperText}
					isInvalid={control ? !!error : !value && isRequired ? true : false}
					errorMessage={control ? error?.message : !value && isRequired ? `${label} is required` : undefined}
					size="md"
					orientation={orientation}
					classNames={{
						label: "text-sm font-medium text-gray-800",
					}}
					color="primary"
					onChange={onControlledChange}>
					{options.map((opt) => {
						const item = getOptionItem(opt);
						return (
							<Radio
								key={item.value}
								value={item.value}
								classNames={{
									label: "text-[12px] font-medium text-gray-800",
								}}>
								{item.label}
							</Radio>
						);
					})}
				</RadioGroup>
			)}
		/>
	) : (
		<RadioGroup
			label={label}
			value={value}
			onValueChange={setValue}
			description={helperText}
			isInvalid={control ? !!error : !value && isRequired}
			errorMessage={control ? error?.message : !value && isRequired ? `${label} is required` : undefined}
			size="md"
			orientation={orientation}
			classNames={{
				label: "text-sm font-medium text-gray-800",
			}}
			color="primary"
			onChange={onChange}>
			{options.map((opt) => {
				const item = getOptionItem(opt);
				return (
					<Radio
						key={item.value}
						value={item.value}
						classNames={{
							label: "text-[12px] font-medium text-gray-800",
						}}>
						{item.label}
					</Radio>
				);
			})}
		</RadioGroup>
	);
};

export default AppRadioGroup;
