const toObj = (i) => (i !== Object(i)) //primitives
    ? ({
        valueOf: () => i
    })
    : i;
const normalize = (obj) => (obj.valueOf === undefined)
    ? obj
    : Object(obj.valueOf());
export { toObj, normalize };
