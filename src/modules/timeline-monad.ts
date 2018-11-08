interface timeline {
  type: string,
  [now: string]: unknown,
  sync: Function

}

const now: string = "now";//time-index of the current time
// on the timeline from now until the future / next - now
const T = (timeFunction: Function = () => { }): timeline =>
  ((observers: Function[]) => {

    const timeline: timeline = ((observers: Function[]) => {
      let currentVal: unknown = undefined; //immutable in the frozen universe
      const self: timeline = {
        type: "timeline-monad",
        //type used for TTX => TX
        get now() { //getter retuens a value of now
          return currentVal;
        },
        set now(val) { //setter <- timeline becomes observable
          const nouse = observers.map((f: Function) => f(val)); //sync(f)
          currentVal = val; //set the val
        },
        sync: ((observers: Function[]) => (f: Function) => {
          const timeline: timeline = self;
          //observe timeline[now]
          const observe: Function = ((observers) => (f: Function) => //
            observers[observers.length] = f)(observers);
          const syncTL: timeline = T();
          const nouse = observe((a: undefined) => {
            const newVal: undefined | timeline = f(a);
            // RightIdentity: join = TTX => TX  
            const nouse =
              (newVal !== undefined) &&
                (newVal.type === timeline.type)
                ? newVal.sync((a: undefined) => syncTL[now] = a)
                : syncTL[now] = newVal
            return true;
          });
          // trigger if the timeline[now] is already filled 
          const nouse1 = (timeline[now] === undefined)
            ? undefined //if undefined, do nothing
            : timeline[now] = timeline[now];

          return syncTL;
        })(observers),
      };
      return self;

    })(observers);

    return ((timeline: timeline) =>
      ({
        init: (timeFunction: Function) => {
          const nouse = // timeFunction = (timeline) =>{...
            timeFunction(timeline); // timeline[now] = x;}
          return timeline; // finally, return the timeline
        }
      })
    )(timeline);

  })([]) //observers = []
    .init(timeFunction); //initiate & return the timeline
export { T, now };