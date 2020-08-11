<script>
  import Button from "../components/Button.svelte";
  import Container from "../components/Container.svelte";
  import Input from "../components/Input.svelte";
</script>

<Container>
  <div class="h-screen flex flex-col justify-center items-center">
    <span class="mb-6 capitalize text-xl font-semibold">Hitshop Admin Panel</span>
    <Input required type="email" />
    <Input required type="password" />
    <div class="w-2/3 max-w-md flex items-center justify-end">
      <Button type="link" className="mr-3">Sign Up</Button>
      <Button>Sign In</Button>
    </div>
  </div>
</Container>
