<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import { connect } from "../shared/utils/mobxSvelte";
  import { signInFormStore } from "../stores/user";

  const { autorun } = connect();

  let emailValue: string | undefined = "";
  let emailError: string | undefined = "";
  let passwordValue: string | undefined = "";
  let passwordError: string | undefined = "";

  $: autorun(() => {
    const { validationResult, showValidateResult, form } = signInFormStore;

    if (form) {
      emailValue = form.login || "";
      passwordValue = form.password || "";
    }

    if (showValidateResult) {
      emailError = validationResult.getFieldMessage("login");
      passwordError = validationResult.getFieldMessage("password");
    }
  });

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

<div class="flex items-center justify-center h-screen mx-auto bg-gray-200">
  <div class="w-full max-w-xs">
    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <Input
        id="email"
        name="email"
        required
        value={emailValue}
        error={emailError}
        placeholder="Email"
        type="email"
        label="Email"
        onInput={onLogin}
      />
      <Input
        id="password"
        name="password"
        required
        value={passwordValue}
        error={passwordError}
        placeholder="******************"
        type="password"
        label="Password"
        onInput={onPassword}
      />
      <div class="flex items-center justify-end">
        <Button type="primary" onClick={onSignIn}>Sign In</Button>
      </div>
    </form>
    <p class="text-xs text-center text-gray-500">&copy;2020 iShop Corp. All rights reserved.</p>
  </div>
</div>
