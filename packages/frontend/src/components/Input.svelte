<script lang="ts">
  export let id: string = "";
  export let name: string = "";
  export let placeholder: string = "placeholder";
  export let type: "email" | "password" = "email";
  export let required: boolean;
  export let label: string = "";
  export let error: string | undefined = undefined;
  export let className: string = "";
  export let onInput: (value: string, event: Event) => void = (value, event) => {
    console.log(value, event);
  };
</script>

<div class="mb-6">
  {#if label}
    <label class="block text-gray-700 text-sm font-bold mb-2" for={id}>{label}</label>
  {/if}
  <input
    {id}
    {name}
    {placeholder}
    {type}
    {required}
    class={`
      shadow 
      appearance-none
      border
      ${error ? 'border-red-500' : ''}
      rounded 
      w-full 
      py-2 
      px-3 
      text-gray-700 
      mb-3
      leading-tight
      focus:outline-none
      ${className}`}
    on:input={(event) => onInput(event.target.value, event)} />
  {#if error}
    <p class="text-red-500 text-xs italic">{error}</p>
  {/if}
</div>
