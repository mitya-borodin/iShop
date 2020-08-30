import type { RouteContext, RouteParams } from "universal-router";
export let params: Readonly<RouteParams> = Object.freeze({});

export const setRouteContext = (context: RouteContext): void => {
  params = Object.freeze({ ...context.params });
};

export const getParams = (): Readonly<RouteParams> => {
  return params;
};
