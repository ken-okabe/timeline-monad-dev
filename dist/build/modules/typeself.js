import { toObj, normalize } from "./primitive-obj.js";
const typed = (I) => (i) => {
    const handler = {
        get: (target, propKey, receiver) => {
            const targetValue = Reflect.get(target, propKey, receiver);
            return (propKey === String(I))
                ? I
                : (typeof targetValue !== "function")
                    ? targetValue
                    : (...args) => (typeof normalize(target)[propKey] === "function")
                        ? normalize(target)[propKey](...args)
                        : targetValue.apply(target, args);
        }
    };
    return isType(I)(i)
        ? i //alreday typed I
        : new Proxy(toObj(i), handler);
};
const istype = (I) => (i) => (i !== Object(i)) //primitives
    ? false
    : i[String(I)] === I;
const Type = (I) => (i) => (i === I) || (i == null)
    ? i
    : typed(I)(i);
const isType = (I) => (i) => (i === I)
    ? true
    : (i == null)
        ? false
        : istype(I)(i);
export { Type, isType };
