<script lang="ts">
  import type { Message } from '$lib/formUtils';

  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

  import { setMessage, superForm, superValidateSync } from "sveltekit-superforms/client";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { loginSchema } from "$lib/formUtils";
  import { auth } from "$lib/firebase";
  import { goto } from "$app/navigation";

  const {
    form,
    errors,
    constraints,
    enhance,
    message
  } = superForm<typeof loginSchema, Message>(
    superValidateSync(loginSchema), {
      SPA: true,
      validators: loginSchema,
      async onUpdate({ form }) {
        if (form.valid) {
          try {
            await signInWithEmailAndPassword(auth, form.data.email, form.data.password);
            await goto('/');
          } catch (error) {
            setMessage(form, {
              status: 'error',
              text: 'Wrong email or password'
            })
          }
        }
      }
    });
</script>

<h1 class="h1">Login</h1>

{#if import.meta.env.DEV}
  <div class="mt-4">
    <SuperDebug data="{$form}" />
  </div>
{/if}

<form method="post" class="px-8 py-4" use:enhance>
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
      autocomplete="password"
      aria-invalid={$errors.password ? 'true' : undefined}
      bind:value={$form.password}
      {...$constraints.password}
    />
  </label>
  <button class="btn w-full variant-filled-primary">Login</button>
</form>