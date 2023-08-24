<script>
    import { SignedIn, SignedOut } from 'sveltefire';
    import { signInAnonymously } from "firebase/auth";
    import { Alert } from 'flowbite-svelte';
</script>

<div class="p-8">
    <Alert>
        <span class="font-medium">Info alert!</span>
        Change a few things up and try submitting again.
    </Alert>
</div>

<SignedIn let:user let:signOut>
    <p>Hello {user.uid}</p>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut let:auth>
    <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>