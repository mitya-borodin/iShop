<script>
  import * as history from "history";
  import { onMount, setContext } from "svelte";
  import { router } from "./router";

  const browserHistory = history.createBrowserHistory();

  setContext("browserHistory", browserHistory);

  $: component = null;

  onMount(() => {
    const checkPath = async () => {
      component = await router.resolve(browserHistory.location);
    };

    browserHistory.listen(checkPath);

    checkPath();
  });
</script>

<div>
  <svelte:component this={component} />
</div>
