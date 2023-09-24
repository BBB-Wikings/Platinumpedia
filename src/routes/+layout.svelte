<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from "@skeletonlabs/skeleton";

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">
						Platinumpedia
					</strong>
				</a>
			</svelte:fragment>

			<div class="container flex w-full gap-3">
				<a href="/">
					Home
				</a>
				<a href="/">
					Profile
				</a>
			</div>

			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-primary"
					href="/auth/login"
				>
					Login
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="container p-10 mx-auto">
		<slot />
	</div>
</AppShell>
