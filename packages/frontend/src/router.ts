/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import UniversalRouter from "universal-router";
import { userRepository } from "./stores/user";

const getSecureComponent = async (path: string): Promise<any> => {
  try {
    await userRepository.init();
  } catch (error) {
    console.error(error);
  }

  if (!userRepository.isAuthorized) {
    return { redirect: "/sign-in" };
  }

  if (userRepository.isAdmin) {
    return { redirect: "/system-admin" };
  }

  if (userRepository.isManager) {
    return { redirect: "/content-manager" };
  }

  if (userRepository.isClient) {
    return { redirect: "/" };
  }

  return await import(path);
};

export const router = new UniversalRouter([
  {
    path: "/",
    action: (): Promise<any> => import("./pages/Home.svelte"),
  },
  {
    path: "/products",
    action: (): Promise<any> => import("./pages/Products.svelte"),
  },
  {
    path: "/products/:id",
    action: (): Promise<any> => import("./pages/Product.svelte"),
  },
  {
    path: "/sign-in",
    action: (): Promise<any> => import("./pages/SignIn.svelte"),
  },
  {
    path: "/content-manager",
    children: [
      {
        path: "",
        action: (): Promise<any> => getSecureComponent("./pages/ContentManager.svelte"),
      },
    ],
  },
  {
    path: "/system-admin",
    children: [
      {
        path: "",
        action: async (): Promise<any> => getSecureComponent("./pages/SystemAdmin.svelte"),
      },
      {
        path: "/create-user",
        action: (): Promise<any> => getSecureComponent("./pages/CreateUser.svelte"),
      },
      {
        path: "/edit-user/:id",
        action: (): Promise<any> => getSecureComponent("./pages/EditUserLogin.svelte"),
      },
      {
        path: "/edit-password/:id",
        action: (): Promise<any> => getSecureComponent("./pages/EditUserPassword.svelte"),
      },
    ],
  },
]);
