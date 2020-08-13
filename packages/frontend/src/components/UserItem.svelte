<script lang="ts">
  import Button from "../components/Button.svelte";
  import Link from "../components/Link.svelte";

  export let id: string;
  export let checked: boolean;
  export let onClick: (id: string) => void;
</script>

<li class="h-32 pt-2 bg-white border-b border-solid border-gray-300 flex flex-col justify-between">
  <div class="flex flex-col justify-around pl-3">
    <p class="text-gray-900 font-bold text-xl mb-2 mt-1">admin@admin.com</p>
    <div>
      <p
        on:click={() => onClick(id)}
        class={`
            inline-block
            ${checked ? 'bg-indigo-500' : 'bg-gray-200'}
            rounded-full
            px-3
            py-1
            text-sm
            font-semibold
            ${checked ? 'text-white' : 'text-gray-700'}
        `}>
        admin
      </p>
    </div>
  </div>
  <div class="flex justify-end mr-3">
    <Button type="link">Remove</Button>
    <Button type="link">
      <Link href="/system-admin/edit-password">Change password</Link>
    </Button>
    <Button type="link">
      <Link href="/system-admin/edit-user">Edit</Link>
    </Button>
  </div>
</li>
