<script>
  import { getContext } from "svelte";

  export let href;

  const browserHistory = getContext("browserHistory");
</script>

<a on:click|preventDefault={() => browserHistory.push(href)} {href}>
  <slot>Link name</slot>
</a>
