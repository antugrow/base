import { NOOP } from "@/helpers";
import { Input, InputProps } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface AppInputProps extends InputProps {
	name?: string;
	setValue?: (value: string) => void;
	isPassword?: boolean;
	isRequired?: boolean;
	error?: FieldError;
	helperText?: string;
	control?: Control<any>;
	isDisabled?: boolean;
	baseInputClassName?: string;
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const AppInput = ({
	name,
	label,
	value,
	placeholder,
	onChange,
	isPassword = false,
	isRequired = false,
	setValue = NOOP,
	error,
	helperText,
	type,
	control,
	isDisabled = false,
	baseInputClassName,
	onKeyDown,
}: AppInputProps) => {
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow(!show);
	return control ? (
		<Controller
			control={control}
			name={name!}
			render={({ field: { onChange: onControlledChange, value: changedValue } }) => (
				<Input
					label={label}
					labelPlacement="outside"
					value={changedValue}
					placeholder={placeholder}
					onChange={onControlledChange}
					onValueChange={setValue}
					variant="bordered"
					color="primary"
					type={type === "password" ? (show ? "text" : "password") : type}
					endContent={
						isPassword ? (
							<button className="focus:outline-none" type="button" onClick={toggleShow}>
								{show ? <EyeOff className="text-lg text-default-400 pointer-events-none" /> : <Eye className="text-lg text-default-400 pointer-events-none" />}
							</button>
						) : null
					}
					description={helperText}
					isInvalid={!!error}
					errorMessage={error?.message}
					size="md"
					isDisabled={isDisabled}
					classNames={{
						base: baseInputClassName,
					}}
					onKeyDown={onKeyDown}
				/>
			)}
		/>
	) : (
		<Input
			label={label}
			labelPlacement="outside"
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			onValueChange={setValue}
			variant="bordered"
			color="primary"
			type={type === "password" ? (show ? "text" : "password") : type}
			endContent={
				isPassword ? (
					<button className="focus:outline-none" type="button" onClick={toggleShow}>
						{show ? <EyeOff className="text-lg text-default-400 pointer-events-none" /> : <Eye className="text-lg text-default-400 pointer-events-none" />}
					</button>
				) : null
			}
			description={helperText}
			isInvalid={control ? !!error : !value && isRequired}
			errorMessage={control ? error?.message : !value && isRequired ? `${label} is required` : undefined}
			size="md"
			isDisabled={isDisabled}
			classNames={{
				base: baseInputClassName,
			}}
			onKeyDown={onKeyDown}
		/>
	);
};

export default AppInput;
