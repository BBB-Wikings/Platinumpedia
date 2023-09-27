<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';

	let title: string = 'Error';
	let message: string = '';
	let action: string = '';
	let actionText: string = '';
	let classes: string = '';

	export { title, message, action, actionText, classes };
</script>

<Alert {message} {classes} {action} {actionText} {title} color="error" icon="bxs:error" />
