type validation = {
	valid: boolean;
	message: string;
};

type validations = {
	[key: string]: validation;
};

const INVALID_EMAIL = 'Please enter a valid email address.';
const EMPTY_EMAIL = 'Please enter your email address.';
const EMPTY_NAME = 'Please enter your name.';
const EMPTY_PASSWORD = 'Please enter your password.';

export function validateName(input: string): validations {
	return { name: validateEmptyInput(input, EMPTY_NAME) };
}
export function validatePassword(input: string): validations {
	return { name: validateEmptyInput(input, EMPTY_PASSWORD) };
}
export function validateEmail(email: string): validations {
	return {
		emptyEmail: validateEmptyInput(email, EMPTY_EMAIL),
		validEmail: validateEmailFormat(email)
	};
}

export function validateEmptyInput(
	input: string,
	customMessage: string = 'Input cannot be empty.'
): validation {
	const valid = input !== '';
	const message = valid ? '' : customMessage;

	return { valid, message };
}

export function validateEmailFormat(email: string): validation {
	const emailRegex = /\S+@\S+\.\S+/;
	const valid = emailRegex.test(email);
	const message = valid ? '' : INVALID_EMAIL;

	return { valid, message };
}
