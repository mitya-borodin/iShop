import type { RouteContext } from "universal-router";
import UniversalRouter from "universal-router";
import { setRouteContext } from "./stores/routeInfo";
import { userRepository } from "./stores/user";

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

  if (
    userRepository.isClient &&
    (context.pathname.indexOf("/system-admin") !== -1 ||
      context.pathname.indexOf("/content-manager") !== -1)
  ) {
    return { redirect: "/" };
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
