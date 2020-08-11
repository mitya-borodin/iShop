<script lang="ts">
  export let type: "default" | "link" = "default";
  export let className = "";
  export let onClick = () => {};
</script>

{#if type === 'default'}
  <button
    class={`
      py-2
      px-4
      rounded-md
      bg-blue-600
      hover:bg-blue-700
      active:bg-blue-800
      font-semibold
      text-base
      text-white
      focus:outline-none
      focus:shadow-outline
      ${className}`}
    on:click|preventDefault={onClick}>
    <slot>Button Default</slot>
  </button>
{/if}

{#if type === 'link'}
  <a
    class={`
      py-2
      px-4
      rounded-md
      font-light
      text-base
      text-blue-400
      hover:text-blue-500
      active:text-blue-700
      focus:outline-none
      focus:shadow-outline
      ${className}`}
    href="/"
    on:click|preventDefault={onClick}>
    <slot>Button Link</slot>
  </a>
{/if}
