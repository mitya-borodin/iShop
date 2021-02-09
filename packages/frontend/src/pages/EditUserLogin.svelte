<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import Link from "../components/Link.svelte";
  import { browserHistory } from "../shared/browserHistory";
  import { connect } from "../shared/utils/mobxSvelte";
  import { getParams } from "../stores/routeInfo";
  import { changeLoginFormStore, userRepository } from "../stores/user";

  const { autorun } = connect();

  let loginValue: string | undefined = "";
  let loginError: string | undefined = "";

  $: autorun(() => {
    const { validationResult, showValidateResult, form } = changeLoginFormStore;

    if (form) {
      loginValue = form.login || "";
    }

    if (showValidateResult) {
      loginError = validationResult.getFieldMessage("login");
    }
  });

  onMount(async () => {
    await changeLoginFormStore.open();

    const { id } = getParams();

    const user = userRepository.list.find((item) => item.id === id);

    if (user) {
      await changeLoginFormStore.change({ login: user.login });
    } else {
      browserHistory.back();
    }
  });
  onDestroy(() => changeLoginFormStore.cancel());

  const onLogin = (login: string): void => {
    changeLoginFormStore.change({ login });
  };
  const onSubmit = (): void => {
    changeLoginFormStore.submit();
  };
  const onBack = (): void => {
    browserHistory.back();
  };
</script>

<div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
  <header class="mb-6 flex flex-shrink-0 items-end bg-white border-b border-solid border-gray-300">
    <div class="flex flex-col justify-center w-full px-2">
      <h1 class="font-bold text-4xl">Changing login</h1>
    </div>
  </header>
  <div class="px-4 flex flex-grow flex-col justify-between">
    <div class="flex flex-col">
      <Input
        id="email"
        label="Login"
        placeholder="Please type login"
        type="email"
        required
        value={loginValue}
        error={loginError}
        onInput={onLogin}
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
