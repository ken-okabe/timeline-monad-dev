import { toObj, normalize } from "./primitive-obj.js";
const extendMethod = (i) => (key) => (f) => {
    const handler = {
        get: (target, propKey, receiver) => {
            const targetValue = Reflect.get(target, propKey, receiver);
            return key === propKey
                ? (...args) => (f(target.valueOf()))(...args)
                : (typeof targetValue !== "function")
                    ? targetValue
                    : (...args) => (typeof normalize(target)[propKey] === "function")
                        ? normalize(target)[propKey](...args)
                        : targetValue.apply(target, args);
        }
    };
    return (i[key] !== undefined)
        ? i
        : new Proxy(toObj(i), handler);
};
export { extendMethod };
