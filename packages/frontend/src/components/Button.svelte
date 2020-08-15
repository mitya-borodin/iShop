<script lang="ts">
  export let type: "default" | "primary" | "link" = "default";
  export let className = "";
  export let disabled: boolean = false;
  export let onClick = () => {};

  const defaultClass: string = `
      py-1
      px-4
      rounded-sm
      transition
      duration-300
      ease-linear
  `;
</script>

{#if type === 'default'}
  <button
    {disabled}
    class={`
      ${defaultClass}
      border
      border-gray-300
      ${disabled ? '' : 'hover:border-blue-400'}
      ${disabled ? '' : 'active:border-blue-600'}
      ${disabled ? 'bg-gray-400' : 'bg-white'}
      font-light
      focus:outline-none
      text-gray-600
      ${disabled ? '' : 'hover:text-blue-400'}
      ${disabled ? '' : 'active:text-blue-600'}
      ${className}`}
    type="button"
    on:click|preventDefault={onClick}>
    <slot>Button Default</slot>
  </button>
{/if}

{#if type === 'primary'}
  <button
    {disabled}
    class={`
      ${defaultClass}
      ${disabled ? 'bg-gray-400' : 'bg-blue-500'}
      ${disabled ? '' : 'hover:bg-blue-400'}
      ${disabled ? '' : 'active:bg-blue-600'}
      ${disabled ? 'text-gray-500' : 'text-white'}
      font-light
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
      ${defaultClass}
      font-light
      text-base
      ${disabled ? 'text-gray-700' : 'text-blue-400'}
      ${disabled ? '' : 'hover:text-blue-500'}
      ${disabled ? '' : 'active:text-blue-700'}
      focus:outline-none
      ${className}`}
    href="/"
    on:click|preventDefault={onClick}>
    <slot>Button Link</slot>
  </a>
{/if}
