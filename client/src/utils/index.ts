export const capitalize = (str: string) => {
	if (typeof str !== "string") return "";
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const generateOptions = (options: string[]) => {
	return options.map((option) => {
		return { label: option, value: option };
	});
};

export function getInitials(name: string) {
	const splitName = name.trim().split(" ");

	if (splitName.length === 1) {
		return splitName[0][0].toUpperCase();
	} else {
		return (splitName[0][0] + splitName[splitName.length - 1][0]).toUpperCase();
	}
}

export const phoneNoRegex = /^0[17]\d{8}$/;

export function formatKenyanPhoneNumber(phoneNumber: string): string {
	const kenyaDialingCode = "+254";
	const kenyanPhoneNumberRegex = /^0(\d{9})$/;

	// Remove any spaces, dashes, or other non-numeric characters from the phone number
	const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, "");

	// Check if the phone number matches the Kenyan phone number pattern
	if (kenyanPhoneNumberRegex.test(sanitizedPhoneNumber)) {
		// If the phone number is valid, format it with the Kenyan dialing code
		const subscriberNumber = sanitizedPhoneNumber.match(kenyanPhoneNumberRegex)![1];
		return `${kenyaDialingCode}${subscriberNumber}`;
	} else {
		// If the phone number is invalid, throw an error
		throw new Error("Invalid Kenyan phone number");
	}
}

