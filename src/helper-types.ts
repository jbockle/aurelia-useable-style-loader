export interface IStyleLoader {
  use: () => void;
  unuse: () => void;
}

export interface IAuLifecycle {
  attached: AuLifecycleMethod;
  detached: AuLifecycleMethod;
}

export type CtorLike = new (...args: any[]) => {};

export type AuLifecycleMethod = () => void | Promise<void>;
