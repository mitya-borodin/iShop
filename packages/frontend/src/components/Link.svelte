<script lang="ts">
  import { getContext } from "svelte";

  export let href: string;
  export let className: string = "";

  const browserHistory = getContext("browserHistory");
</script>

<a on:click|preventDefault={() => browserHistory.push(href)} {href} class={className}>
  <slot>Link name</slot>
</a>
