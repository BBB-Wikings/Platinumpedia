<script lang="ts">
	import { uppercaseFirstLetter } from '$lib/textUtils';
	import { fade } from 'svelte/transition';
	import { variantGhostClass } from "$lib/CssClassUtils";

	export let message: string;
	export let type = 'primary';
</script>

<aside class="alert {variantGhostClass(type)}" transition:fade|local={{ duration: 200 }}>
	<div class="alert-message">
		<p><span class="font-medium">{uppercaseFirstLetter(type)}:</span> {message}</p>
	</div>
</aside>
