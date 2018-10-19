import { log } from "./log.js";
import { M } from "../modules/monad.js";
const test_monad = () => {
    log("=Monad ========= ");
    const a = 3;
    const Ma = M(a);
    const MMa = M(Ma);
    log("-----MMa === Ma----------------");
    log(Ma);
    log(MMa === Ma);
    log("=====calc");
    const plus = (b) => (t) => (t + b);
    const multiply = (b) => (t) => (t * b);
    log((Ma).valueOf());
    log((Ma)
        .op(plus(5))
        .valueOf());
    log((Ma)
        .op(plus(5))
        .op(multiply(2))
        .op(plus(10))
        .valueOf());
    {
        const f = (m) => M(m)
            .op(plus(5))
            .op(multiply(2))
            .op(plus(10));
        log((Ma)
            .op(f)
            .valueOf());
    }
    log("-(Ma).op(M)---//right id-----=");
    log((Ma)
        .op(M)
        .valueOf());
    const f = (a) => (a + 1);
    log("===================");
    log(M(a).op(f).valueOf());
    log(f(a));
    log("===================");
    log(M(a).op(M).valueOf());
    log(M(a).valueOf());
    log("===================");
};
export { test_monad };