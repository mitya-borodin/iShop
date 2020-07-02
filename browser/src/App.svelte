<script>
  import * as history from "history";
  import UniversalRouter from "universal-router";
  import { setContext, onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import Product from "./pages/Product.svelte";
  import Products from "./pages/Products.svelte";
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
  <svelte:component this="{component}" />
</div>
