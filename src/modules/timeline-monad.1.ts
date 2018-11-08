interface timeline {
  [now: string]: unknown,
  sync: Function,
  type: string
}

const now: string = "now";
//"now" : from now until future/next-now 

const T = (timeFunction: Function = () => { }): timeline => ((observers: Function[]) => {

  type worker = {
    init: Function,
    observe: Function,
  }

  const worker: worker = { // worker methods are not exposed
    init: (timeFunction: Function) => {
      const nouse = // timeFunction = (timeline) =>{...
        timeFunction(timeline); // timeline[now] = x;}
      return timeline; // finally, return the timeline
    },
    observe: ((observers) => (f: Function) =>//observe timeline[now]
      observers[observers.length] = f)(observers)
  };

  const sync: Function = ((worker: worker) => (f: Function) => {
    const syncTL: timeline = T();
    const nouse = worker.observe((a: undefined) => {
      const newVal: any = f(a);
      // RightIdentity: join = TTX => TX  
      const nouse = (newVal.type !== timeline.type)
        ? syncTL.now = newVal
        : newVal.sync((a: undefined) => syncTL.now = a)
          && newVal.now === undefined
          ? undefined //if undefined, do nothing
          : syncTL.now = newVal[now];
      return true;
    });
    return syncTL;
  })(worker);

  const timeline = ((sync) => (observers: Function[]) => {//observed timeline
    let now: undefined = undefined;//immutable in the frozen universe
    return {
      get now() { return now; },  //getter retuens a value of now
      set now(val) {              //setter <- timeline becomes observable
        const nouse = observers.map((f) => f(val));//sync(f)
        now = val; //set the val
      },
      sync: sync, //Monad map/fmap/bind or then of Promise
      type: "timeline-monad" //type used for TTX => TX
    };
  })(sync)(observers);

  return worker; //return worker to init()
})([]) //observers = []
  .init(timeFunction); //initiate & return the timeline
export { T, now };
