<script>
  import Link from "../components/Link.svelte";
  import Button from "../components/Button.svelte";
</script>

<div class="w-screen h-screen flex flex-col items-center justify-center">
  <span class="capitalize text-xl font-semibold mb-6">Hitshop Admin Panel</span>
  <input
    class="h-8 w-2/3 p-2 border border-solid border-gray-200 rounded-sm mb-4 outline-none
    focus:shadow-outline focus:bg-blue-100"
    type="email"
    required />
  <input
    class="h-8 w-2/3 p-2 border border-solid border-gray-200 rounded-sm outline-none
    focus:shadow-outline focus:bg-blue-100 mb-6"
    type="password"
    required />
  <Button />
</div>
