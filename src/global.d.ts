import type { IStaticMethods } from "preline/dist";

declare global {
  interface Window {
    _;
    HSStaticMethods: IStaticMethods;
  }
}

export {};