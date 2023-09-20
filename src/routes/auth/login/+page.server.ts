import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import type { Actions, PageServerLoad, RequestEvent } from './$types.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$lib/firebase.js';

const schema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);

	return { form, invalidCredentials: false };
};

export const actions: Actions = {
	default: async ({ request }: RequestEvent) => {
		const form = await superValidate(request, schema);

		console.log('form:', form);

		if (!form.valid) {
			return fail(400, { form, invalidCredentials: false });
		}

		try {
			await signInWithEmailAndPassword(auth, form.data.email, form.data.password);
			console.log('Signed in!');
			return redirect(302, '/');
		} catch (error) {
			console.log('Error signing in:', error);
			return { form, invalidCredentials: true };
		}
	}
};
