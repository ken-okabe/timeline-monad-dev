const now = "now";
//"now" : from now until future/next-now 
const T = (timeFunction = () => { }) => ((observers) => {
    const worker = {
        init: (timeFunction) => {
            const nouse = // timeFunction = (timeline) =>{...
             timeFunction(timeline); // timeline[now] = x;}
            return timeline; // finally, return the timeline
        },
        observe: ((observers) => (f) => //observe timeline[now]
         observers[observers.length] = f)(observers)
    };
    const sync = ((worker) => (f) => {
        const syncTL = T();
        const nouse = worker.observe((a) => {
            const newVal = f(a);
            // RightIdentity: join = TTX => TX  
            const nouse = (newVal.type !== timeline.type)
                ? syncTL.now = newVal
                : newVal.sync((a) => syncTL.now = a)
                    && newVal.now === undefined
                    ? undefined //if undefined, do nothing
                    : syncTL.now = newVal[now];
            return true;
        });
        return syncTL;
    })(worker);
    const timeline = ((sync) => (observers) => {
        let now = undefined; //immutable in the frozen universe
        return {
            get now() { return now; },
            set now(val) {
                const nouse = observers.map((f) => f(val)); //sync(f)
                now = val; //set the val
            },
            sync: sync,
            type: "timeline-monad" //type used for TTX => TX
        };
    })(sync)(observers);
    return worker; //return worker to init()
})([]) //observers = []
    .init(timeFunction); //initiate & return the timeline
export { T, now };
