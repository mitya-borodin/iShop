<script lang="ts">
  export let className: string | undefined;
  export let disabled: boolean = false;
  export let value: string = "";
  export let error: string | undefined = undefined;
  export let onInput: (value: string, event: Event) => void = (value, event) => {
    console.log(value, event);
  };
</script>

<div class={`inline-block ${className}`}>
  <div class="relative">
    <select
      class={`
      block 
      appearance-none 
      w-full 
      ${disabled ? 'bg-gray-400' : 'bg-white'}
      border 
      ${error ? 'border-red-500' : ''}
      ${disabled ? 'border-gray-500' : 'border-gray-400'}
      hover:border-gray-500
      ${disabled ? 'text-gray-600' : ''}
      px-4
      py-2 
      pr-8 
      mb-3
      rounded 
      shadow 
      leading-tight 
      focus:outline-none  
    `}
      {disabled}
      bind:value
      on:input={(event) => onInput(event.target.value, event)}>
      <slot>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </slot>
    </select>
    <div
      class={`
      pointer-events-none
      absolute 
      inset-y-0 
      right-0 
      flex 
      items-center 
      px-2 
      ${disabled ? 'text-gray-500' : 'text-gray-700'}
    `}>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
  {#if error}
    <p class="text-red-500 text-xs italic">{error}</p>
  {/if}
</div>
