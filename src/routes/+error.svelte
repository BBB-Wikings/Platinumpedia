<script>
	import ErrorAlert from "$lib/components/ErrorAlert.svelte";

	import { page } from '$app/stores';
	import { getStatusMessage } from '$lib/utils/errorUtils';
</script>

<ErrorAlert
	title="{$page.status}: {getStatusMessage($page.status)}"
	message="{$page.error?.message}"
	action="/"
	actionText="Go Home"
/>
