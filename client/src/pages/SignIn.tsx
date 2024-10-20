import AppInput from "@/components/forms/AppInput";
import AcmeLogo from "@/components/layout/AcmeLogo";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import useAuthUtils from "@/hooks/useAuthUtils";
import { IUser } from "@/types/User";
import { formatKenyanPhoneNumber, phoneNoRegex } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

const FormSchema = object({
	phoneNo: string().matches(phoneNoRegex, "Phone number is not valid").required("Phone number is required"),
	password: string().required("Password is required"),
});

const SignIn = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const formMethods = useForm({
		resolver: yupResolver(FormSchema),
		defaultValues: {
			phoneNo: "",
			password: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = formMethods;

	const { addUserSession } = useAuthStore();
	const { signIn } = useAuthUtils();
	const navigate = useNavigate();

	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);

		try {
			const resp = await signIn(formatKenyanPhoneNumber(data.phoneNo), data.password);

			if (resp?.status === "success") {
				const data = resp.data;

				const token = data?.token;``
				const userData = data?.userInfo;

				const userInfo = {
					...userData,
					token,
				} as IUser;

				addUserSession(userInfo);

				toast.success("Sign In Successfully");
				reset();
				if (userInfo?.role?.toLowerCase() === "Admin") {
					navigate("/admin");
				} else {
					navigate("/farmer");
				}
			} else {
				toast.error(`Sign In Failed due to ${resp?.msg}`);
			}
		} catch (err) {
			toast.error("Sign In Failed");
		} finally {
			setLoading(false);
		}
	});

	return (
		<>
			<div className="text-center pb-8">
				<AcmeLogo />
				<div className="mt-5">
					<h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Welcome Back to Antugrow</h3>
				</div>
			</div>
			<FormProvider {...formMethods}>
				<form onSubmit={onSubmit}>
					<AppInput label={"Phone No"} placeholder="e.g. 0700123456" name="phoneNo" control={control} error={errors.phoneNo} />
					<Spacer y={3} />
					<AppInput label={"Password"} placeholder="********" type="password" isPassword name="password" control={control} error={errors.password} />
					<Spacer y={3} />
					<Button color="primary" className="w-full" type="submit" isLoading={loading} isDisabled={loading} >
						Submit
					</Button>
					<p className="mt-2">
						Don't have an account?{" "}
						<Link to="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
							Sign Up
						</Link>
					</p>
				</form>
			</FormProvider>
		</>
	);
};

export default SignIn;
