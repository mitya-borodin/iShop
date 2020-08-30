<script lang="ts">
  import Link from "../components/Link.svelte";
</script>

<div class="text-center font-serif">
  <header class="bg-gray-100 h-screen flex justify-center items-center flex-col text-3xl">
    <img src="/logo.svg" class="App-logo pointer-events-none m-4 h-64" alt="logo" />
    <div>
      <h1>Entry page</h1>
      <ul>
        <li class="text-orange-500 text-base">
          <Link href="/products">Каталог</Link>
        </li>
        <li class="text-orange-500 text-base">
          <Link href="/products/100">Элемент каталога</Link>
        </li>
        <li class="text-orange-500 text-base">
          <Link href="/sign-in">Войти</Link>
        </li>
        <li class="text-orange-500 text-base">
          <Link href="/content-manager">Панель управления контентом</Link>
        </li>
        <li class="text-orange-500 text-base">
          <Link href="/system-admin">Панель администрирования</Link>
        </li>
      </ul>
    </div>
  </header>
</div>
