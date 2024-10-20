import AppInput from "@/components/forms/AppInput";
import AppRadioGroup from "@/components/forms/AppRadioGroup";
import AcmeLogo from "@/components/layout/AcmeLogo";
import useAuthUtils from "@/hooks/useAuthUtils";
import { formatKenyanPhoneNumber, generateOptions, phoneNoRegex } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

const roles = ["Admin", "Farmer", "Investor"];

const FormSchema = object({
	name: string().required("Name is required"),
	location: string().required("Location is required"),
	role: string().required("Role is required"),
	phoneNo: string().matches(phoneNoRegex, "Phone number is not valid").required("Phone number is required"),
	password: string().required("Password is required"),
});

const SignUp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const formMethods = useForm({
		resolver: yupResolver(FormSchema),
		defaultValues: {
			name: "",
			location: "",
			role: "",
			phoneNo: "",
			password: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors: formErrors },
		reset,
	} = formMethods;

	const { createAccount } = useAuthUtils();
	const navigate = useNavigate();

	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);

		const info = {
			...data,
			phoneNo: formatKenyanPhoneNumber(data.phoneNo)
		}

		try {
			const resp = await createAccount(info);

			if (resp?.status === "success") {
				toast.success("Accounted Created Successfully");
				reset();
				navigate("/auth/signin");
			} else {
				toast.error("Failed to create account");
			}
		} catch (err) {
			toast.error("Failed to create account");
		} finally {
			setLoading(false);
		}
	});

	return (
		<>
			<div className="text-center pb-8">
				<AcmeLogo />
				<div className="mt-5">
					<h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Get Started with Antugrow</h3>
				</div>
			</div>
			<FormProvider {...formMethods}>
				<form onSubmit={onSubmit}>
					<AppInput label="Name" placeholder="e.g. John Mwangi" name="name" control={control} error={formErrors.name} />
					<Spacer y={3} />
					<AppInput label={"Phone No"} placeholder="e.g. 0700123456" name="phoneNo" control={control} error={formErrors.phoneNo} />
					<Spacer y={3} />
					<AppInput label={"Location"} placeholder="e.g. Murang'a" helperText="Where are you located?" name="location" control={control} error={formErrors.location} />
					<AppRadioGroup label="Role" options={generateOptions(roles)} orientation="horizontal" name="role" control={control} error={formErrors.role} />
					<Spacer y={3} />
					<AppInput label={"Password"} placeholder="********" type="password" isPassword name="password" control={control} error={formErrors.password} />
					<Spacer y={3} />
					<Button color="primary" className="w-full" type="submit" isLoading={loading} isDisabled={loading}>
						Submit
					</Button>
					<p className="mt-2">
						Already have an account?{" "}
						<Link to="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
							Sign In
						</Link>
					</p>
				</form>
			</FormProvider>
		</>
	);
};

export default SignUp;
