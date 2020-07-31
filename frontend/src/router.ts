import UniversalRouter from "universal-router";
import Home from "./pages/Home.svelte";
import Product from "./pages/Product.svelte";
import Products from "./pages/Products.svelte";

export const router = new UniversalRouter([
  {
    path: "/",
    action: () => Home,
  },
  {
    path: "/products",
    action: () => Products,
  },
  {
    path: "/products/:id",
    action: () => Product,
  },
]);
