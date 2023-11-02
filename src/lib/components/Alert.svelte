<script lang="ts">
	import { variantGhostClass, variantGlassClass, Variant } from "$lib/utils/CssClassUtils";

	let title: string = '';
	let message: string = 'This is an alert message.';
	let action: string = '';
	let actionText: string = '';
	let color: Variant = Variant.Primary;
	let icon: string = 'mdi:alert-circle';

	export { title, message, action, actionText, color, icon };
</script>

<aside class="alert {variantGhostClass(color)} my-4">
	<div class="text-7xl">
		<iconify-icon {icon} />
	</div>

	<div class="alert-message">
		{#if title}
			<h2 class="h2">{title}</h2>
		{/if}
		<p>{message}</p>
	</div>

	{#if action}
		<div class="alert-actions">
			<a href={action} class="btn {variantGlassClass(color)}">{actionText}</a>
		</div>
	{/if}
</aside>
