import { toObj, normalize } from "./primitive-obj";

const typed = (I: Function) => (i: any) => {
  const handler = {
    get: (target: object, propKey: string, receiver: object) => {
      const targetValue = Reflect.get(target, propKey, receiver);
      return (propKey === String(I))
        ? I
        : (typeof targetValue !== "function")
          ? targetValue
          : (...args: undefined[]) =>
            (typeof normalize(target)[propKey] === "function")
              ? normalize(target)[propKey](...args)
              : targetValue.apply(target, args)
    }
  }
  return isType(I)(i)
    ? i//alreday typed I
    : new Proxy(toObj(i), handler);
};

const istype = (I: Function) => (i: { [key: string]: object }) => (i !== Object(i))//primitives
  ? false
  : <object>i[String(I)] === I

const Type = (I: Function) => (i: any) => (i === I) || (i == null)
  ? i
  : typed(I)(i);

const isType = (I: Function) => (i: any) => (i === I)
  ? true
  : (i == null)
    ? false
    : istype(I)(i);

export { Type, isType };