type validation = {
	valid: boolean;
	message: string;
};

export function validateInput(input: string): validation {
	const valid = input !== '';
	const message = valid ? '' : 'Please enter your name.';

	return { valid, message };
}
export function validateEmail(email: string): validation {
	if (email === '') {
		emailError = 'Please enter your email address.';
		return false;
	}

	if (!email.includes('@')) {
		emailError = 'Please enter a valid email address.';
		return false;
	}

	emailError = null;
	return true;
}
