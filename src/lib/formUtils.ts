import { z } from 'zod';

export type Message = { status: 'error' | 'success' | 'warning'; text: string };

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});
