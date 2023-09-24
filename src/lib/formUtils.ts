import { z } from 'zod';

export type Message = { status: 'error' | 'success' | 'warning'; text: string };

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const registerSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}
	});

export const forgotPasswordSchema = z.object({
	email: z.string().email()
});
