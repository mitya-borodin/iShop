import { autorun } from "mobx";
import type { IReactionDisposer } from "mobx";
import { onDestroy } from "svelte";

type Autorun = (view: () => void) => void;

export function connect(): { autorun: Autorun } {
  let disposer: IReactionDisposer;

  onDestroy(() => disposer && disposer());

  return {
    autorun: (view: () => void) => {
      // eslint-disable-next-line no-unused-expressions
      disposer && disposer();
      disposer = autorun(view);
    },
  };
}
