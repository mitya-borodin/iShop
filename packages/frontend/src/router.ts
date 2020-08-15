import UniversalRouter from "universal-router";

export const router = new UniversalRouter([
  {
    path: "/",
    action: async () => (await import("./pages/Home.svelte")).default,
  },
  {
    path: "/products",
    action: async () => (await import("./pages/Products.svelte")).default,
  },
  {
    path: "/products/:id",
    action: async () => (await import("./pages/Product.svelte")).default,
  },
  {
    path: "/signIn",
    action: async () => (await import("./pages/SignIn.svelte")).default,
  },
  {
    path: "/system-admin",
    children: [
      {
        path: "",
        action: async () => (await import("./pages/SystemAdmin.svelte")).default,
      },
      {
        path: "/create-user",
        action: async () => (await import("./pages/CreateUser.svelte")).default,
      },
      {
        path: "/edit-user/:id",
        action: async () => (await import("./pages/EditUserLogin.svelte")).default,
      },
      {
        path: "/edit-password/:id",
        action: async () => (await import("./pages/EditUserPassword.svelte")).default,
      },
    ],
  },
]);
