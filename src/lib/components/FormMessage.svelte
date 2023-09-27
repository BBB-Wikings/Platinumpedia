<script lang="ts">
	import { uppercaseFirstLetter } from '$lib/textUtils';
	import { fade } from 'svelte/transition';

	export let message: string;
	export let type = 'info';
</script>

<aside class="alert variant-ghost-{type}" transition:fade|local={{ duration: 200 }}>
	<div class="alert-message">
		<p><span class="font-medium">{uppercaseFirstLetter(type)}:</span> {message}</p>
	</div>
</aside>
