<script lang="ts">
  export let type: "default" | "link" = "default";
  export let className = "";
  export let disabled: boolean = false;
  export let onClick = () => {};
</script>

{#if type === 'default'}
  <button
    {disabled}
    class={`
      ${disabled ? 'bg-gray-400' : 'bg-indigo-500'}
      ${disabled ? 'text-gray-500' : 'text-white'}
      font-bold
      py-2 
      px-4 
      rounded
      focus:outline-none
      ${className}`}
    type="button"
    on:click|preventDefault={onClick}>
    <slot>Button Default</slot>
  </button>
{/if}

{#if type === 'link'}
  <a
    {disabled}
    class={`
      py-2
      px-4
      rounded-md
      font-light
      text-base
      ${disabled ? 'text-gray-700' : 'text-indigo-400'}
      ${disabled ? 'hover:text-gray-700' : 'hover:text-indigo-500'}
      ${disabled ? 'active:text-gray-700' : 'active:text-indigo-700'}
      focus:outline-none
      ${className}`}
    href="/"
    on:click|preventDefault={onClick}>
    <slot>Button Link</slot>
  </a>
{/if}
