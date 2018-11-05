const now = "now";
//"now" : from now until future/next-now
const T = (timeFunction = () => { }) => {
    const emptyObservers = [];
    const timeline = {
        now: undefined,
        contextValue: undefined,
        observers: emptyObservers,
        sync: (f) => {
            const syncTL = T();
            timeline.observers[timeline.observers.length] =
                { syncTL, f };
            return syncTL;
        },
        init: function () {
            timeFunction(this); // timeFunction = 
            return this; // timeline => timeline[now] = x;
        }
    }.init();
    Object.defineProperties(timeline, //detect TL[now] update
    {
        now: {
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
                        : newVal.sync((a) => o.syncTL[now] = a)
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
