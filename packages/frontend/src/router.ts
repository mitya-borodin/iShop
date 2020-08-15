import UniversalRouter from "universal-router";
import CreateUser from "./pages/CreateUser.svelte";
import EditUserLogin from "./pages/EditUserLogin.svelte";
import EditUserPassword from "./pages/EditUserPassword.svelte";
import Home from "./pages/Home.svelte";
import Product from "./pages/Product.svelte";
import Products from "./pages/Products.svelte";
import SignIn from "./pages/SignIn.svelte";
import SystemAdmin from "./pages/SystemAdmin.svelte";

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
  {
    path: "/signIn",
    action: () => SignIn,
  },
  {
    path: "/system-admin",
    children: [
      {
        path: "",
        action: () => SystemAdmin,
      },
      {
        path: "/create-user",
        action: () => CreateUser,
      },
      {
        path: "/edit-user/:id",
        action: () => EditUserLogin,
      },
      {
        path: "/edit-password/:id",
        action: () => EditUserPassword,
      },
    ],
  },
]);
