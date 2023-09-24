<script lang="ts">
  import type { Message } from '$lib/formUtils';

  import { setMessage, superForm, superValidateSync } from "sveltekit-superforms/client";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { loginSchema } from "$lib/formUtils";
  import { auth } from "$lib/firebase";
  import { goto } from "$app/navigation";
  import FormMessage from "$lib/components/FormMessage.svelte";

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
      autocomplete="current-password"
      aria-invalid={$errors.password ? 'true' : undefined}
      bind:value={$form.password}
      {...$constraints.password}
    />
    {#if $errors.password}<span class="text-error-500">{$errors.password}</span>{/if}
  </label>

  {#if $message}
    <FormMessage type="{$message.status}" message="{$message.text}"/>
  {/if}

  <button class="btn variant-filled-primary w-full my-4">Login</button>

  <div class="text-sm font-medium flex justify-between">
    <span>
      Not registered?
      <a
        href="/auth/register"
        class="text-primary-500 hover:underline"
      >
        Create account
      </a>
    </span>

    <a
      href="/auth/forgot-password"
      class="hover:underline text-primary-500"
    >
      Forgot password?
    </a>
  </div>
</form>