<script lang="ts">
  import Button from "../components/Button.svelte";
  import Link from "../components/Link.svelte";
  import Input from "../components/Input.svelte";
  import Select from "../components/Select.svelte";

  import { onMount, onDestroy } from "svelte";
  import { addUserFormStore } from "../stores/user";
  import { connect } from "../shared/utils/mobxSvelte";

  const { autorun } = connect();

  let loginValue: string | undefined = "";
  let loginError: string | undefined = "";
  let groupValue: string | undefined = "";
  let groupError: string | undefined = "";
  let passwordValue: string | undefined = "";
  let passwordError: string | undefined = "";
  let passwordConfirmValue: string | undefined = "";
  let passwordConfirmError: string | undefined = "";

  $: autorun(() => {
    const { validationResult, showValidateResult, form } = addUserFormStore;

    if (form) {
      loginValue = form.login || "";
      groupValue = form.group || "";
      passwordValue = form.password || "";
      passwordConfirmValue = form.passwordConfirm || "";
    }

    if (showValidateResult) {
      loginError = validationResult.getFieldMessage("login");
      groupError = validationResult.getFieldMessage("group");
      passwordError = validationResult.getFieldMessage("password");
      passwordConfirmError = validationResult.getFieldMessage("passwordConfirm");
    }
  });

  onMount(async () => {
    await addUserFormStore.open();
    addUserFormStore.change({ group: "Observer" });
  });
  onDestroy(() => addUserFormStore.cancel());

  const onLogin = (login: string): void => {
    addUserFormStore.change({ login });
  };
  const onGroup = (group: string): void => {
    addUserFormStore.change({ group });
  };
  const onPassword = (password: string): void => {
    addUserFormStore.change({ password });
  };
  const onPasswordConfirm = (passwordConfirm: string): void => {
    addUserFormStore.change({ passwordConfirm });
  };
  const onCreateUser = (): void => {
    addUserFormStore.submit();
  };
</script>

<div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
  <header class="mb-6 flex flex-shrink-0 items-end bg-white border-b border-solid border-gray-300">
    <div class="flex flex-col justify-center w-full px-2">
      <h1 class="font-bold text-4xl">Creating user</h1>
    </div>
  </header>
  <div class="px-4 flex flex-grow flex-col justify-between">
    <div class="flex flex-col">
      <Input
        id="login"
        label="Login"
        placeholder="Please type email"
        type="email"
        required
        value={loginValue}
        error={loginError}
        onInput={onLogin} />
      <Select className="mb-6" value={groupValue} error={groupError} onInput={onGroup}>
        <option value="Manager">Manager</option>
        <option value="Observer">Observer</option>
        <option value="Admin">Admin</option>
      </Select>
      <Input
        id="password"
        label="Password"
        placeholder="Please type password"
        type="password"
        required
        value={passwordValue}
        error={passwordError}
        onInput={onPassword} />
      <Input
        id="passwordConfirm"
        label="Confirm password"
        placeholder="Please type password again"
        type="password"
        required
        value={passwordConfirmValue}
        error={passwordConfirmError}
        onInput={onPasswordConfirm} />
    </div>
    <div class="flex justify-end mb-6">
      <Link href="/system-admin">
        <Button className="mr-2">Cancel</Button>
      </Link>
      <Button type="primary" className="mr-2" onClick={onCreateUser}>Create</Button>
    </div>
  </div>
</div>
