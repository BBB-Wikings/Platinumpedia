<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
  import { Variant } from "$lib/utils/CssClassUtils";

	let title: string = 'Error';
	let message: string = '';
	let action: string = '';
	let actionText: string = '';

	export { title, message, action, actionText };
</script>

<Alert
  {message}
  {action}
  {actionText}
  {title}
  color="{Variant.Error}"
  icon="bxs:error"
/>
