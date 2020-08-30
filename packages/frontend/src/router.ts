/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import UniversalRouter from "universal-router";
import type { RouteContext } from "universal-router";
import { userRepository } from "./stores/user";
import { setRouteContext } from "./stores/routeInfo";

const getSecureComponent = async (importModule: any, context: RouteContext): Promise<any> => {
  setRouteContext(context);

  try {
    await userRepository.init();
  } catch (error) {
    console.error(error);
  }

  if (!userRepository.isAuthorized && context.pathname.indexOf("/sign-in") === -1) {
    return { redirect: "/sign-in" };
  }

  if (userRepository.isAdmin && context.pathname.indexOf("/system-admin") === -1) {
    return { redirect: "/system-admin" };
  }

  if (userRepository.isManager && context.pathname.indexOf("/content-manager") === -1) {
    return { redirect: "/content-manager" };
  }

  return importModule();
};

export const router = new UniversalRouter([
  {
    path: "/",
    action: async (context): Promise<any> =>
      getSecureComponent(() => import("./pages/Home.svelte"), context),
  },
  {
    path: "/products",
    action: async (context): Promise<any> =>
      getSecureComponent(() => import("./pages/Products.svelte"), context),
  },
  {
    path: "/products/:id",
    action: async (context): Promise<any> =>
      getSecureComponent(() => import("./pages/Product.svelte"), context),
  },
  {
    path: "/sign-in",
    action: async (context): Promise<any> =>
      getSecureComponent(() => import("./pages/SignIn.svelte"), context),
  },
  {
    path: "/content-manager",
    children: [
      {
        path: "",
        action: async (context): Promise<any> =>
          getSecureComponent(() => import("./pages/ContentManager.svelte"), context),
      },
    ],
  },
  {
    path: "/system-admin",
    children: [
      {
        path: "",
        action: async (context): Promise<any> =>
          getSecureComponent(() => import("./pages/SystemAdmin.svelte"), context),
      },
      {
        path: "/create-user",
        action: async (context): Promise<any> =>
          getSecureComponent(() => import("./pages/CreateUser.svelte"), context),
      },
      {
        path: "/edit-user/:id",
        action: async (context): Promise<any> =>
          getSecureComponent(() => import("./pages/EditUserLogin.svelte"), context),
      },
      {
        path: "/edit-password/:id",
        action: async (context): Promise<any> =>
          getSecureComponent(() => import("./pages/EditUserPassword.svelte"), context),
      },
    ],
  },
]);
