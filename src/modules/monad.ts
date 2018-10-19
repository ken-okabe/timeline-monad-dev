
import { Type, isType } from "./typeself";
import { extendMethod } from "./extend-method";

const M = (a: any) => Type(M)
  (extendMethod(a)("op")(op));

const op = (t: any) => (f: Function) => M(f(t));

export { M }