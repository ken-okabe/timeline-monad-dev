const toObj = (i: any) => (i !== Object(i)) //primitives
  ? ({
    valueOf: () => i
  })
  : i;

const normalize = (obj: any) =>
  (obj.valueOf === undefined)
    ? obj
    : Object(obj.valueOf());

export { toObj, normalize };