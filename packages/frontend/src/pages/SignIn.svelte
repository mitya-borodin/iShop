<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import { onMount, onDestroy } from "svelte";
  import { signInFormStore } from "../stores/user";

  onMount(() => signInFormStore.open());
  onDestroy(() => signInFormStore.cancel());

  const onLogin = (login: string): void => {
    signInFormStore.change({ login });
  };
  const onPassword = (password: string): void => {
    signInFormStore.change({ password });
  };
  const onSignIn = (): void => {
    signInFormStore.submit();
  };
</script>

<div class="h-screen mx-auto flex justify-center items-center bg-gray-200">
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Input
        id="email"
        name="email"
        required
        placeholder="Email"
        type="email"
        label="Email"
        onInput={onLogin} />
      <Input
        id="password"
        name="password"
        required
        placeholder="******************"
        type="password"
        label="Password"
        onInput={onPassword} />
      <div class="flex items-center justify-end">
        <Button type="primary" onClick={onSignIn}>Sign In</Button>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">&copy;2020 iShop Corp. All rights reserved.</p>
  </div>
</div>
