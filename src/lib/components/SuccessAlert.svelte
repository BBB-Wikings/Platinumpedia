<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import { Variant } from "$lib/utils/CssClassUtils";

	let title: string = 'Success';
	let message: string = '';
	let action: string = '';
	let actionText: string = '';

	export { title, message, action, actionText };
</script>

<Alert
	{title}
	{message}
	{action}
	{actionText}
	color="{Variant.Success}"
	icon="bxs:check-circle"
/>
