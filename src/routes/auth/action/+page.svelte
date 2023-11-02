<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import type { PageData } from './$types';
	import type { Message } from '$lib/utils/formUtils';
	import type { handlerResponse } from '$lib/firebase/firebaseActionHandler';

	import { error } from '@sveltejs/kit';
	import { resetPasswordSchema } from '$lib/utils/formUtils';
	import { handleResetPassword, HandlerType } from '$lib/firebase/firebaseActionHandler';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import LoadingAlert from '$lib/components/LoadingAlert.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';

	export let data: PageData;

	const mode = data.body.mode;
	const actionCode = data.body.actionCode;

	const { form, errors, constraints, enhance } = superForm<typeof resetPasswordSchema, Message>(
		superValidateSync(resetPasswordSchema),
		{
			SPA: true,
			validators: resetPasswordSchema,
			async onUpdate({ form }) {
				if (form.valid) {
					handler = handleResetPassword(actionCode, form.data.password);
				}
			}
		}
	);

	let title = '';
	let handler: Promise<handlerResponse>;
	let newPassword: string | undefined = undefined;

	switch (mode) {
		case 'resetPassword':
			title = 'Reset Password';
			handler = handleResetPassword(actionCode, newPassword);
			break;
		case 'recoverEmail':
			title = 'Recover Email';
			// Display email recovery handler and UI.
			break;
		case 'verifyEmail':
			title = 'Verify Email';
			// Display email verification handler and UI.
			break;
		default:
			throw error(400, 'Invalid mode.');
	}
</script>

<h1 class="h1">{title}</h1>

{#await handler}
	<LoadingAlert message="We are processing your request." />
{:then response}
	{#if response.type === HandlerType.RESET_PASSWORD}
		<form method="post" class="px-8 py-4" use:enhance>
			{#if import.meta.env.DEV}
				<div class="my-4">
					<SuperDebug data={$form} />
				</div>
			{/if}

			<label class="label my-4">
				<span>Enter your new Password</span>
				<input
					id="password"
					type="password"
					name="password"
					class="input"
					title="Input (password)"
					placeholder="password"
					autocomplete="new-password"
					aria-invalid={$errors.password ? 'true' : undefined}
					bind:value={$form.password}
					{...$constraints.password}
				/>
				{#if $errors.password}
					<span class="text-error-500">{$errors.password}</span>
				{/if}
			</label>

			<label class="label my-4">
				<span>Confirm your new Password</span>
				<input
					id="confirmPassword"
					type="password"
					name="confirmPassword"
					class="input"
					title="Input (password)"
					placeholder="password"
					autocomplete="new-password"
					aria-invalid={$errors.confirmPassword ? 'true' : undefined}
					bind:value={$form.confirmPassword}
					{...$constraints.confirmPassword}
				/>
				{#if $errors.confirmPassword}
					<span class="text-error-500">{$errors.confirmPassword}</span>
				{/if}
			</label>

			<button class="btn variant-filled-primary w-full my-4"> Save new Password </button>
		</form>
	{:else if response.type === HandlerType.PASSWORD_RESETED}
		<SuccessAlert
			message="Your password has been reset successfully."
			action="/auth/login"
			actionText="Go to login"
		/>
	{/if}
{:catch error}
	<ErrorAlert
		message={error.message}
		action={error.actionUrl}
		actionText={error.actionText}
	/>
{/await}
