import { Type } from "./typeself.js";
import { extendMethod } from "./extend-method.js";
const M = (a) => Type(M)(extendMethod(a)("op")(op));
const op = (t) => (f) => M(f(t));
export { M };
