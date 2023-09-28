<script lang="ts">
	import { variantGhostClass } from "$lib/utils/CssClassUtils";
	import { uppercaseFirstLetter } from '$lib/utils/textUtils';
	import { fade } from 'svelte/transition';

	export let message: string;
	export let type = 'primary';
</script>

<aside class="alert {variantGhostClass(type)}" transition:fade|local={{ duration: 200 }}>
	<div class="alert-message">
		<p><span class="font-medium">{uppercaseFirstLetter(type)}:</span> {message}</p>
	</div>
</aside>
