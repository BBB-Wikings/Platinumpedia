<script lang="ts">
	import type { Message } from '$lib/formUtils';

	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { registerSchema } from '$lib/formUtils';
	import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
	import { auth } from '$lib/firebase';

	import FormMessage from '$lib/components/FormMessage.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const { form, errors, constraints, enhance, message } = superForm<typeof registerSchema, Message>(
		superValidateSync(registerSchema),
		{
			SPA: true,
			validators: registerSchema,
			async onUpdate({ form }) {
				if (form.valid) {
					try {
						await createUserWithEmailAndPassword(auth, form.data.email, form.data.password);
					} catch (error) {
						setMessage(form, {
							status: 'error',
							text: 'Something went wrong. Please try again later.'
						});
					}

					try {
						await sendEmailVerification(auth.currentUser);
						setMessage(form, {
							status: 'success',
							text: 'Please check your email for verification'
						});
					} catch (error) {
						await auth.currentUser.delete();
						setMessage(form, {
							status: 'error',
							text: 'Something went wrong. Please try again later.'
						});
					}
				}
			}
		}
	);
</script>

<h1 class="h1">Login</h1>

<form method="post" class="px-8 py-4" use:enhance>
	{#if import.meta.env.DEV}
		<div class="my-4">
			<SuperDebug data={$form} />
		</div>
	{/if}

	<label class="label my-4">
		<span>Enter your Email-address</span>
		<input
			id="email"
			type="email"
			name="email"
			class="input"
			title="Input (email)"
			placeholder="john@example.com"
			autocomplete="email"
			autofocus
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="text-error-500">{$errors.email}</span>{/if}
	</label>

	<label class="label my-4">
		<span>Enter your Password</span>
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
		{#if $errors.password}<span class="text-error-500">{$errors.password}</span>{/if}
	</label>

	<label class="label my-4">
		<span>Confirm your Password</span>
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
		{#if $errors.confirmPassword}<span class="text-error-500">{$errors.confirmPassword}</span>{/if}
	</label>

	{#if $message}
		<FormMessage type={$message.status} message={$message.text} />
	{/if}

	<button class="btn variant-filled-primary w-full my-4">Register</button>
</form>
