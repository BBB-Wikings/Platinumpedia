<script lang="ts">
	import { Button, Modal, Label, Input, Helper, Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { validateEmail, validatePassword } from '$lib/validation';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import type { validation } from '$lib/validation';
	import { auth } from '$lib/firebase';

	let email = '';
	let password = '';
	let formModal = false;
	let invalidLogin = false;
	let emailError: string | null = null;
	let passwordError: string | null = null;

	function signIn(email: string, password: string) {
		const emailValidation = validateEmail(email);
		const passwordValidation = validatePassword(password);

		emailValidation.foreach((validation: validation) => {
			if (validation.valid !== true) {
				emailError = validation.message;
			}
		});

		passwordValidation.foreach((validation: validation) => {
			if (validation.valid !== true) {
				passwordError += validation.message;
			}
		});

		if (emailError !== null || passwordError !== null) {
			return;
		}

		signInWithEmailAndPassword(auth, email, password)
			.then(() => (formModal = false))
			.catch(() => (invalidLogin = true));
	}
</script>

<Button on:click={() => (formModal = true)}>Login</Button>

<Modal bind:open={formModal} size="xs" class="w-full" autoclose={false}>
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Login to PlatinumPedia</h3>
		<Label class="space-y-2">
			<Label for="email" class="block mb-2">Email</Label>
			<Input type="email" name="email" id="email" bind:value={email} required />
			{#if emailError !== null}
				<Helper class="mt-2" color="red">
					{emailError}
				</Helper>
			{/if}
		</Label>
		<Label class="space-y-2">
			<Label for="password" class="block mb-2">Passwort</Label>
			<Input type="password" name="password" id="password" bind:value={password} required />
			{#if passwordError !== null}
				<Helper class="mt-2" color="red">
					{passwordError}
				</Helper>
			{/if}
		</Label>
		{#if invalidLogin}
			<Alert border color="red">
				<InfoCircleSolid slot="icon" class="w-4 h-4" />
				<span class="font-medium">Error:</span>
				Invalid Email or Password
			</Alert>
		{/if}
		<div class="flex items-start">
			<a
				href="/auth/forgot-password"
				class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
				>Forgot password?
			</a>
		</div>
		<Button type="submit" class="w-full1" on:click={() => signIn(email, password)}>Login</Button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered?
			<a
				href="/auth/forgot-password"
				class="text-primary-700 hover:underline dark:text-primary-500"
			>
				Create account
			</a>
		</div>
	</form>
</Modal>
