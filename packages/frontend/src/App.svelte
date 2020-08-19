<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { router } from "./router";
  import { browserHistory } from "./shared/browserHistory";

  setContext("browserHistory", browserHistory);

  let component: any = null;

  onMount(() => {
    const checkPath = async () => {
      console.log(5555555);
      const result = await router.resolve(browserHistory.location);

      if (result && typeof result.redirect === "string") {
        browserHistory.replace(result.redirect);
        component = null;
        return;
      }

      if (result && result.default) {
        component = result.default;
        return;
      }

      if (result) {
        component = result;
        return;
      }

      component = null;
    };

    browserHistory.listen(checkPath);

    checkPath();
  });
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<div>
  <svelte:component this={component} />
</div>
