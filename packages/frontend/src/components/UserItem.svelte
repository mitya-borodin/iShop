<script lang="ts">
  import Button from "../components/Button.svelte";
  import Link from "../components/Link.svelte";

  export let id: string | undefined;
  export let name: string | undefined;
  export let group: string | undefined;
  export let checked: boolean;
  export let onClick: (id: string) => void;
  export let onRemove: (id: string) => void;
</script>

<li class="h-32 pt-2 bg-white border-b border-solid border-gray-300 flex flex-col justify-between">
  <div class="flex flex-col justify-around pl-3">
    <p class="text-gray-900 font-bold text-xl mb-2 mt-1">{name}</p>
    <div>
      <p
        on:click={() => onClick(id || "")}
        class={`
            inline-block
            rounded-full
            px-3
            py-1
            ${checked ? "bg-indigo-500" : "bg-gray-200"}
            text-sm
            font-semibold
            ${checked ? "text-white" : "text-gray-700"}
            cursor-pointer
        `}
      >
        {group}
      </p>
    </div>
  </div>
  <div class="flex justify-end mr-3">
    <Button type="link" onClick={() => onRemove(id || "")}>Remove</Button>
    <Button type="link">
      <Link href="/system-admin/edit-password/{id}">Change password</Link>
    </Button>
    <Button type="link">
      <Link href="/system-admin/edit-user/{id}">Edit</Link>
    </Button>
  </div>
</li>
