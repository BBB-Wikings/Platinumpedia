<script lang="ts">
	let title: string = 'Alert';
	let message: string = 'This is an alert message.';
	let action: string = '/';
	let actionText: string = 'Home';
	let color: string = 'error';
	let classes: string = '';
	let icon: string = 'bxs:error';

	export { title, message, action, actionText, color, classes, icon };
</script>

<aside class="alert variant-ghost-{color} {classes}">
	<div class="text-7xl">
		<iconify-icon {icon} />
	</div>

	<div class="alert-message">
		<h1 class="h1">{title}</h1>
		<p>{message}</p>
	</div>

	{#if action}
		<div class="alert-actions">
			<a href={action} class="btn variant-glass-{color}">{actionText}</a>
		</div>
	{/if}
</aside>
