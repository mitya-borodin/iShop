<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import Link from "../components/Link.svelte";
  import { browserHistory } from "../shared/browserHistory";
  import { connect } from "../shared/utils/mobxSvelte";
  import { changePasswordFormStore } from "../stores/user";

  const { autorun } = connect();

  let passwordValue: string | undefined = "";
  let passwordError: string | undefined = "";
  let passwordConfirmValue: string | undefined = "";
  let passwordConfirmError: string | undefined = "";

  $: autorun(() => {
    const { validationResult, showValidateResult, form } = changePasswordFormStore;

    if (form) {
      passwordValue = form.password || "";
      passwordConfirmValue = form.passwordConfirm || "";
    }

    if (showValidateResult) {
      passwordError = validationResult.getFieldMessage("password");
      passwordConfirmError = validationResult.getFieldMessage("passwordConfirm");
    }
  });

  onMount(async () => changePasswordFormStore.open());
  onDestroy(() => changePasswordFormStore.cancel());

  const onPassword = (password: string): void => {
    changePasswordFormStore.change({ password });
  };
  const onPasswordConfirm = (passwordConfirm: string): void => {
    changePasswordFormStore.change({ passwordConfirm });
  };
  const onSubmit = (): void => {
    changePasswordFormStore.submit();
  };
  const onBack = (): void => {
    browserHistory.back();
  };
</script>

<div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
  <header class="mb-6 flex flex-shrink-0 items-end bg-white border-b border-solid border-gray-300">
    <div class="flex flex-col justify-center w-full px-2">
      <h1 class="font-bold text-4xl">Changing password</h1>
    </div>
  </header>
  <div class="px-4 flex flex-grow flex-col justify-between">
    <div class="flex flex-col">
      <Input
        id="password"
        label="Password"
        placeholder="Please type password"
        type="password"
        required
        value={passwordValue}
        error={passwordError}
        onInput={onPassword}
      />
      <Input
        id="passwordConfirm"
        label="Confirm password"
        placeholder="Please type password again"
        type="password"
        required
        value={passwordConfirmValue}
        error={passwordConfirmError}
        onInput={onPasswordConfirm}
      />
    </div>
    <div class="flex justify-end mb-6">
      <Link href="/system-admin">
        <Button className="mr-2" onClick={onBack}>Cancel</Button>
      </Link>
      <Button type="primary" className="mr-2" onClick={onSubmit}>Change</Button>
    </div>
  </div>
</div>
