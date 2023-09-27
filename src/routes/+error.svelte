<script>
	import { page } from '$app/stores';

	import 'iconify-icon';
	import { getStatusMessage } from '$lib/errorUtils';

	console.log($page.data);
</script>

<aside class="alert variant-ghost-error">
	<div class="text-7xl">
		<iconify-icon icon="bxs:error" />
	</div>

	<div class="alert-message">
		<h1 class="h1">{$page.status}: {getStatusMessage($page.status)}</h1>
		<p>{$page.error?.message}</p>
	</div>
	<div class="alert-actions">
		<a href="/" class="btn variant-glass-error">Go Home</a>
	</div>
</aside>
