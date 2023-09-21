<script lang="ts">
  import type { PageData } from "./$types.js";
  import { superForm } from 'sveltekit-superforms/client';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { Alert, Button, Helper, Input, Label } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";

  export let data: PageData;

  const { form, errors, constraints, enhance } = superForm(data.form);
  const invalidCredentials = data.invalidCredentials;

  console.log(data);
</script>

{#if import.meta.env.DEV}
  <div class="mt-4">
    <SuperDebug data="{$form}" />
  </div>
{/if}

<div class="mt-4">
  <form method="POST" class="flex flex-col space-y-6" use:enhance>
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Login to PlatinumPedia</h3>
    <Label class="space-y-2">
      <Label for="email" class="block mb-2">Email</Label>
      <Input
        type="email"
        name="email"
        id="email"
        aria-invalid={$errors.email ? 'true' : undefined}
        bind:value={$form.email}
        {...$constraints.email}
      />
      {#if $errors.email}
        <Helper class="mt-2" color="red">
          {$errors.email}
        </Helper>
      {/if}
    </Label>
    <Label class="space-y-2">
      <Label for="password" class="block mb-2">Email</Label>
      <Input
        type="password"
        name="password"
        id="password"
        aria-invalid={$errors.password ? 'true' : undefined}
        bind:value={$form.password}
        {...$constraints.password}
      />
      {#if $errors.password}
        <Helper class="mt-2" color="red">
          {$errors.password}
        </Helper>
      {/if}
    </Label>

    {#if invalidCredentials}
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
    <Button type="submit" class="w-full1">Login</Button>
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
</div>

