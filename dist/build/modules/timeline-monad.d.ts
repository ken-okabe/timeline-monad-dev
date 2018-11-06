interface timeline {
    [now: string]: unknown;
    sync: Function;
    type: string;
}
declare const now: string;
declare const T: (timeFunction?: Function) => timeline;
export { T, now };
