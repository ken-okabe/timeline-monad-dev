import { toObj, normalize } from "./primitive-obj";

const extendMethod = (i: any) => (key: string) => (f: Function) => {
  const handler = {
    get: (target: object, propKey: string, receiver: object) => {
      const targetValue = Reflect.get(target, propKey, receiver);
      return key === propKey
        ? (...args: any[]) => (f(target.valueOf()))(...args)
        : (typeof targetValue !== "function")
          ? targetValue
          : (...args: undefined[]) =>
            (typeof normalize(target)[propKey] === "function")
              ? normalize(target)[propKey](...args)
              : targetValue.apply(target, args)
    }
  };
  return (i[key] !== undefined)
    ? i
    : new Proxy(toObj(i), handler);
};

export { extendMethod };