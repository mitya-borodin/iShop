<script lang="ts">
  export let type: "email" | "password" = "email";
  export let required: boolean;
  export let className: string = "";
  export let onInput: (value: string, event: Event) => void = (value, event) => {
    console.log(value, event);
  };
</script>

<input
  {type}
  {required}
  class={`
    h-10
    w-2/3 
    max-w-md 
    p-2 
    border 
    border-solid 
    border-gray-200 
    rounded-sm 
    mb-4 
    outline-none
    focus:shadow-outline
    focus:bg-blue-100
    ${className}`}
  on:input={(event) => onInput(event.target.value, event)} />
