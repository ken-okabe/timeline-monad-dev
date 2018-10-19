import { log } from "./log.js";
import { T, now } from "../modules/timeline-monad.js";
const test_timeline_monad = () => {
    log("=Tonad ========= ");
    const a = (x) => x;
    //
    const Ta = T(a);
    const TTa = T(Ta);
    log("-----TTa === Ta----------------");
    log(Ta);
    log(TTa);
    log(TTa === Ta);
    log("===================");
    log(T(a).sync(T).valueOf());
    log(T(a).sync(() => Ta).valueOf());
    log(T(a).valueOf());
    log("===================");
    /*
     
      log("=====calc");
     
      const plus = (b: number) => (t: number) => (t + b);
      const multiply = (b: number) => (t: number) => (t * b);
     
      log(
        (Ta).valueOf()
      );
     
      log(
        (Ta)
          .op(plus(5))
          .valueOf()
     
      );
     
      log(
        (Ta)
          .op(plus(5))
          .op(multiply(2))
          .op(plus(10))
          .valueOf()
     
      );
      log("-(Ta).op(T)---//right id-----=");
      log(
        (Ta)
          .op(T)
          .valueOf()
      );
     
     
      const f = (a: any) => (a + 1);
      log("===================");
      log(
        T(a).op(f).valueOf()
      );
      log(
        f(a)
      );
     
      log("===================");
     
     
    */
    //========================
    const b = Ta
        .sync((a) => a * 10)
        .sync((a) => a * 10);
    Ta[now] = 7;
    console.log(Ta[now]);
    console.log(b[now]);
    Ta[now] = 987;
    //---------------
    const timerTL = T((timeline) => {
        const f = () => { timeline[now] = "1 sec"; };
        setTimeout(f, 1000);
    });
    timerTL.sync(console.log);
    //---------------------------------
    const fs = require("fs");
    const initTL = T();
    const fileRead = (dataTL) => {
        fs.readFile("package.json", "utf8", (err, text) => {
            dataTL[now] = text;
        });
        return initTL;
    };
    const print = (initTL) => {
        console.log("====================================");
        dataTL.sync(console.log);
        return initTL;
    };
    const tl = initTL
        .sync(fileRead)
        .sync(print);
    const dataTL = T();
    initTL[now] = dataTL;
    //===========================
};
export { test_timeline_monad };
