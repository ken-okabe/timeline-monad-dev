interface observer { syncTL: timeline, f: Function }

interface timeline {
  now: unknown,
  contextValue: unknown,
  observers: observer[],
  sync: Function,
  init: Function
}

const now = "now";
//"now" : from now until future/next-now
const T = (timeFunction: Function = () => { }) => {

  const emptyObservers: observer[] = [];

  const timeline = {
    now: undefined,
    contextValue: undefined,
    observers: emptyObservers,
    sync: (f: Function): timeline => {
      const syncTL = T();
      timeline.observers[timeline.observers.length] =
        { syncTL, f };
      return syncTL;
    },
    init: function (): timeline {   // T(timeFunction) 
      timeFunction(this); // timeFunction = 
      return this;        // timeline => timeline[now] = x;
    }
  }.init();

  Object.defineProperties(timeline, //detect TL[now] update
    {
      now: { //timeline[now]
        get() {
          return timeline.contextValue;
        },
        set(value) {
          timeline.contextValue = value;
          timeline.observers.map((o) => {
            const newVal = o.f(value);
            //RightIdentity:join = TTX => TX  
            const nouse = (newVal.observers === undefined)
              ? o.syncTL[now] = newVal
              : newVal.sync((a: unknown) => o.syncTL[now] = a)
                && newVal[now] === undefined
                ? undefined //if undefined, do nothing
                : o.syncTL[now] = newVal[now];
          });
        }
      }
    });

  return timeline;
};

export { T, now };