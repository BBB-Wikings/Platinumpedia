import type { PageLoad } from './$types';
import { auth } from '$lib/firebase/firebase';
import { redirect } from '@sveltejs/kit';

export const load = ((event) => {
	const user = auth.currentUser;

	if (!user) {
		throw redirect(302, '/auth/login');
	}
}) satisfies PageLoad;
