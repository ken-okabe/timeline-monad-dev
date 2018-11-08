interface timeline {
    type: string;
    [now: string]: unknown;
    sync: Function;
}
declare const now: string;
declare const T: (timeFunction?: Function) => timeline;
export { T, now };
