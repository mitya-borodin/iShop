<script>
  import Button from "../components/Button.svelte";
  import Link from "../components/Link.svelte";
  import Input from "../components/Input.svelte";
  import Select from "../components/Select.svelte";
</script>

<div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
  <header class="mb-6 flex flex-shrink-0 items-end bg-white border-b border-solid border-gray-300">
    <div class="flex flex-col justify-center w-full px-2">
      <h1 class="font-bold text-4xl">Changing password</h1>
    </div>
  </header>
  <div class="px-4 flex flex-grow flex-col justify-between">
    <div class="flex flex-col">
      <Input
        id="password"
        label="Password"
        placeholder="Please type password"
        type="password"
        required />
      <Input
        id="passwordConfirm"
        label="Confirm password"
        placeholder="Please type password again"
        type="password"
        required />
    </div>
    <div class="flex justify-end mb-6">
      <Button className="mr-2">
        <Link href="/system-admin">Cancel</Link>
      </Button>
      <Button type="primary" className="mr-2">Change</Button>
    </div>
  </div>
</div>
