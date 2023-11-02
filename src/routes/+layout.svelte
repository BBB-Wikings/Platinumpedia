<script lang="ts">
	import Alert from "$lib/components/Alert.svelte";

	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);

	storePopup.set({ computePosition, flip, shift, offset, arrow });
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/">
						<strong class="text-xl uppercase">Platinumpedia</strong>
					</a>
				</svelte:fragment>

				<div class="container flex w-full gap-3">
					<a href="/"> Home </a>

					<SignedIn let:user let:signOut>
						<a href="/profile"> Profile </a>
					</SignedIn>
				</div>

				<svelte:fragment slot="trail">
					<SignedOut let:auth>
						<a class="btn btn-sm variant-ghost-primary" href="/auth/login"> Login </a>
					</SignedOut>

					<SignedIn let:user let:signOut>
						<span>{user.email}</span>
						<button class="btn btn-sm variant-ghost-primary" on:click={signOut}> Sign Out </button>
					</SignedIn>

					<LightSwitch />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<div class="container p-10 mx-auto">
			{#if $flash}
				<Alert message="{$flash.message}" color="{$flash.type}"/>
			{/if}
			<slot />
		</div>
	</AppShell>
</FirebaseApp>
