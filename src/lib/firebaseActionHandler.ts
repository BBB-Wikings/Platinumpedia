import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '$lib/firebase';

export enum HandlerType {
	RESET_PASSWORD,
	PASSWORD_RESETED
}

export type handlerResponse = {
	type: HandlerType;
};

class HandlerError extends Error {
	constructor(public message: string, public actionUrl: string, public actionText: string) {
		super(message);
	}
}

export async function handleResetPassword(
	actionCode: string,
	newPassword?: string
): Promise<handlerResponse> {
	let type = HandlerType.RESET_PASSWORD;

	if (newPassword === undefined) {
		try {
			await verifyPasswordResetCode(auth, actionCode);
		} catch (error) {
			throw new HandlerError(
				'Invalid or expired action code. Please try again.',
				'/auth/forgot-password',
				'Try again'
			);
		}
	} else {
		try {
			await confirmPasswordReset(auth, actionCode, newPassword);
			type = HandlerType.PASSWORD_RESETED;
		} catch (error) {
			throw new HandlerError(
				'Invalid or expired action code. Please try again.',
				'/auth/forgot-password',
				'Try again'
			);
		}
	}

	return {
		type
	} as handlerResponse;
}
