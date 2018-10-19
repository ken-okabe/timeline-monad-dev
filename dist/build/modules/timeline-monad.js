import { Type, isType } from "./typeself.js";
import { extendMethod } from "./extend-method.js";
const now = "now";
const T = (a = () => { }) => {
    const handler = {
        set: (target, prop, value, receiver) => {
            target[prop] = value;
            return prop === now
                ? (() => {
                    p.observers.map((o) => o.syncTL[now] = o.f(value));
                    return true;
                })()
                : true;
        }
    };
    const p = isType(T)(a)
        ? a //alreday typed T
        : new Proxy(a, handler);
    p.observers = [];
    const timeline = Type(T)(extendMethod(p)("sync")(sync));
    a(timeline);
    return timeline;
};
const sync = (t) => (f) => {
    const syncTL = T();
    t.observers[t.observers.length] = { syncTL, f };
    return syncTL;
};
export { T, now };
