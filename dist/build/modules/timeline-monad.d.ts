interface observer {
    syncTL: timeline;
    f: Function;
}
interface timeline {
    now: unknown;
    contextValue: unknown;
    observers: observer[];
    sync: Function;
    init: Function;
}
declare const now = "now";
declare const T: (timeFunction?: Function) => timeline;
export { T, now };
