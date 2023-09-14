<script lang="ts">
	import '../app.css';
	import { FirebaseApp, SignedIn, SignedOut } from "sveltefire";
	import {
		DarkMode,
		Navbar,
		NavHamburger,
		NavBrand,
		NavUl,
		NavLi,
		Button,
		Input
	} from "flowbite-svelte";
	import { auth, firestore, storage } from '$lib/firebase';
	import { SearchOutline } from "flowbite-svelte-icons";
	import LoginModal from "$lib/components/LogInModal.svelte";
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<header class="w-full bg-white dark:bg-slate-950">
		<Navbar class="bg-gray-200 dark:bg-gray-800" let:hidden let:toggle>
			<NavBrand href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PlatinumPedia</span>
			</NavBrand>
			<NavUl
				{hidden}
				divClass="w-full lg:block lg:w-auto order-1 lg:order-none"
				ulClass="flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 bg-transparent lg:border-0"
				nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-500 dark:text-gray-400 border-0 hover:text-primary-700 dark:hover:text-primary-700"
				activeClass="md:!pl-3 md:!py-2 lg:!pl-0 text-primary-700 hover:text-primary-800"
			>
				<NavLi class="lg:px-2 lg:mb-0" active={true} href="/">Home</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" active={false} href="/pages/about">About</NavLi>
				<NavLi
					active={false}
					class="lg:px-2 lg:mb-0"
					href="https://github.com/shinokada/flowbite-sveltekit-responsive-sidebar-layout"
				>
					GitHub
				</NavLi>
			</NavUl>
			<div class="flex items-center gap-2">
				<Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
					<SearchOutline class="w-5 h-5" />
				</Button>
				<div class="hidden relative md:block">
					<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<SearchOutline class="w-4 h-4" />
					</div>
					<Input id="search-navbar" class="pl-10" placeholder="Search..." />
				</div>
				<NavHamburger on:click={toggle} />

				<SignedIn let:user let:signOut>
					<Button on:click={signOut}>Logout</Button>
				</SignedIn>

				<SignedOut let:auth>
					<LoginModal />
				</SignedOut>

				<DarkMode class="inline-block hover:text-primary" />

				<NavHamburger on:click={toggle} btnClass="lg:hidden" />
			</div>
		</Navbar>
	</header>

	<div class="flex px-4 mx-auto w-full">
		<main class="w-full mx-auto container">
			<slot />
		</main>
	</div>
</FirebaseApp>
