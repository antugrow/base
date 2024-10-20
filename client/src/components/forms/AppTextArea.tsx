import { Textarea, forwardRef } from "@nextui-org/react";
import { Ref } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface AppTextAreaProps {
	name?: string;
	label: string;
	value?: string;
	setValue?: (value: string) => void;
	onChange?: (value: string) => void;
	error?: FieldError;
	helperText?: string;
	control?: Control<any>;
	placeholder?: string;
	maxLength?: number;
}

const AppTextArea = forwardRef(function AppTextArea(props: AppTextAreaProps, ref: Ref<HTMLTextAreaElement>) {
	const { name, label, placeholder, value, setValue, onChange, error, helperText, control, maxLength } = props;

	return control ? (
		<Controller
			name={name!}
			control={control}
			render={({ field: { onChange: onControlledChange, value: changedValue } }) => (
				<Textarea
					label={label}
					labelPlacement="outside"
					variant="bordered"
					color="primary"
					value={changedValue}
					placeholder={placeholder}
					onChange={onControlledChange}
					onValueChange={setValue}
					description={helperText}
					isInvalid={!!error}
					errorMessage={error?.message}
					size="md"
					minRows={3}
					ref={ref}
					maxLength={maxLength}
				/>
			)}
		/>
	) : (
		<Textarea
			label={label}
			labelPlacement="outside"
			variant="bordered"
			color="primary"
			value={value}
			placeholder={placeholder}
			onValueChange={(val) => {
				setValue && setValue(val);
				onChange && onChange(val);
			}}
			description={helperText}
			isInvalid={!!error}
			errorMessage={error?.message}
			size="md"
			minRows={3}
			ref={ref}
			maxLength={maxLength}
		/>
	);
});

export default AppTextArea;

