import { Button, Popover, PopoverContent, PopoverTrigger, cn } from "@nextui-org/react";
import { Control, Controller, FieldError } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { SetStateAction } from "react";
import { Calendar } from "../ui/calendar";

interface AppDatePickerProps {
	label?: string;
	name?: string;
	control?: Control<any>;
	value?: Date;
	setValue?: (value: SetStateAction<Date>) => void;
	className?: string;
	error?: FieldError;
}

const AppDatePicker = ({ label, name, control, value, setValue, className, error }: AppDatePickerProps) => {
	return (
		<div className="flex flex-col space-y-2">
			{label && (
				<label htmlFor={name} className="antugrow text-sm font-semibold text-primary-700">
					{label}
				</label>
			)}
			{control ? (
				<Controller
					name={name!}
					control={control}
					render={({ field: { onChange, value: controlledValue } }) => (
						<Popover>
							<PopoverTrigger>
								<Button
									startContent={<CalendarIcon className="h-4 w-4" />}
									variant={"bordered"}
									color="primary"
									className={cn("w-full md:w-[250px] justify-start text-left font-normal", !controlledValue && "text-muted-foreground", className)}>
									{controlledValue ? format(new Date(controlledValue), "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 antugrow font-nunito">
								<Calendar mode="single" selected={new Date(controlledValue)} onSelect={(val) => onChange(val)} initialFocus />
							</PopoverContent>
						</Popover>
					)}
				/>
			) : (
				<Popover>
					<PopoverTrigger>
						<Button
							color="primary"
							startContent={<CalendarIcon className="h-4 w-4" />}
							variant={"bordered"}
							className={cn("md:w-[250px] justify-start text-left font-normal", !value && "text-muted-foreground", className)}>
							{value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0 antugrow font-nunito">
						<Calendar mode="single" selected={value} onSelect={setValue as any} initialFocus />
					</PopoverContent>
				</Popover>
			)}
			{error && <p className="text-xs text-danger">{error?.message}</p>}
		</div>
	);
};

export default AppDatePicker;
