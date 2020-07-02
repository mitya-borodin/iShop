<script>
  import { getContext } from "svelte";
  import Link from "../components/Link.svelte";

  const browserHistory = getContext("browserHistory");

  const onLink = (path) => {
    console.log(path);
    browserHistory.push(path);
  };
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
