<script lang="ts">
	import type { Message } from '$lib/utils/formUtils';

	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { forgotPasswordSchema } from '$lib/utils/formUtils';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { auth } from '$lib/firebase/firebase';

	import FormMessage from '$lib/components/FormMessage.svelte';

	const { form, errors, constraints, enhance, message } = superForm<
		typeof forgotPasswordSchema,
		Message
	>(superValidateSync(forgotPasswordSchema), {
		SPA: true,
		validators: forgotPasswordSchema,
		async onUpdate({ form }) {
			if (form.valid) {
				try {
					await sendPasswordResetEmail(auth, form.data.email);
					setMessage(form, {
						status: 'success',
						text: 'An email has been sent to you with instructions on how to reset your password.'
					});
				} catch (error) {
					setMessage(form, {
						status: 'error',
						text: 'Error sending email'
					});
				}
			}
		}
	});
</script>

<h1 class="h1">Forgot Password</h1>

<form method="post" class="px-8 py-4" use:enhance>
	<label class="label my-4">
		<span>Enter your email</span>
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

	{#if $message}
		<FormMessage type={$message.status} message={$message.text} />
	{/if}

	<button class="btn variant-filled-primary w-full my-4"> Get password reset email </button>
</form>
