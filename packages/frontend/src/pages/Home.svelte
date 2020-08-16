<script lang="ts">
  import Link from "../components/Link.svelte";
</script>

<div class="text-center font-serif">
  <header class="bg-gray-100 h-screen flex justify-center items-center flex-col text-3xl">
    <img src="/logo.svg" class="App-logo pointer-events-none m-4 h-64" alt="logo" />
    <div>
      <h1>This Home Page</h1>
      <ul>
        <li class="text-orange-500">
          <Link href="/products">Products</Link>
        </li>
        <li class="text-orange-500">
          <Link href="/products/100">Product (100)</Link>
        </li>
        <li class="text-orange-500">
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li class="text-orange-500">
          <Link href="/system-admin">System Admin</Link>
        </li>
      </ul>
    </div>
  </header>
</div>
