
import { Type, isType } from "./typeself";
import { extendMethod } from "./extend-method";

const now = "now";

const T = (a: any = () => { }) => {

  const handler = {
    set: (target: any, prop: string, value: object, receiver: object) => {
      target[prop] = value;
      return prop === now
        ? (() => {
          p.observers.map((o: any) => o.syncTL[now] = o.f(value));
          return true;
        })()
        : true;
    }
  };

  const p = isType(T)(a)
    ? a//alreday typed T
    : new Proxy(a, handler);

  p.observers = [];

  const timeline = Type(T)
    (extendMethod(p)("sync")(sync));

  a(timeline);

  return timeline;
};

const sync = (t: any) => (f: Function) => {
  const syncTL = T();
  t.observers[t.observers.length] = { syncTL, f };
  return syncTL;
};

export { T, now }