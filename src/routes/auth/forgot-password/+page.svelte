<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import { Alert, Heading, Helper, Input, Label } from 'flowbite-svelte';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import Container from '$lib/components/Container.svelte';
	import { auth } from '$lib/firebase.js';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let email = '';
	let emailError = '';
	let emailSent = false;

	function sendPasswordReset(email: string) {
		if (!validateEmail(email)) {
			return null;
		}

		sendPasswordResetEmail(auth, email).finally(() => (emailSent = true));
	}

	function validateEmail(email: string): boolean {
		if (email === '') {
			emailError = 'Please enter your email address.';
			return false;
		}

		if (!email.includes('@')) {
			emailError = 'Please enter a valid email address.';
			return false;
		}

		emailError = '';
		return true;
	}
</script>

<Container width="w-5/12">
	<Heading tag="h1" class="mb-4" customSize="text-3xl font-bold">Forgot Passwort</Heading>
	<SignedIn>
		<Alert border>
			<InfoCircleSolid slot="icon" class="w-4 h-4" />
			<p>You are logged in please reset youre password in the <a href="/">Profile Page</a></p>
		</Alert>
	</SignedIn>

	<SignedOut>
		<div class="flex flex-col justify-between gap-3">
			<div>
				<Label class="block mb-2"
					>Please enter the email of your account. We will send you and email with a password reset
					link.</Label
				>
				<Input
					label="Email"
					id="email"
					name="email"
					required
					placeholder="email@example.com"
					bind:value={email}
				/>
				{#if emailError}
					<Helper color="red" class="text-sm mt-2">
						{emailError}
					</Helper>
				{/if}
			</div>
			{#if emailSent}
				<Alert border color="green">
					<InfoCircleSolid slot="icon" class="w-4 h-4" />
					Email sent if account exists.
				</Alert>
			{/if}
			<button
				class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				on:click={() => sendPasswordReset(email)}
			>
				Reset Password
			</button>
		</div>
	</SignedOut>
</Container>
