import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

export const load = (async ({ url }: RequestEvent) => {
	const mode = url.searchParams.get('mode');
	const oobCode = url.searchParams.get('oobCode');

	if (!mode || !oobCode) throw error(400, 'Missing required parameters');

	return {
		status: 200,
		body: {
			mode,
			actionCode: oobCode
		}
	};
}) satisfies PageServerLoad;
