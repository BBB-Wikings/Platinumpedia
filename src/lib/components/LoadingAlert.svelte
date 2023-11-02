<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
  import { Variant } from "$lib/utils/CssClassUtils";

	export const message: string = '';
</script>

<Alert
  {message}
  title="Loading..."
  color="{Variant.Secondary}"
  icon="eos-icons:bubble-loading"
/>
