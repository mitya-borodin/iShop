<script>
  import Link from "../components/Link.svelte";
  import { data } from "../stores/store";

  console.log(data);
</script>

<div>
  <h1>Home</h1>
  <ul>
    <li>
      <Link href="/products">Products</Link>
    </li>
    <li>
      <Link href="/products/1111">Product (1111)</Link>
    </li>
  </ul>
</div>
