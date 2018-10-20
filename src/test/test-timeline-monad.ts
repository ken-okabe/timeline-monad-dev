import { log } from "./log";
import { T, now } from "../modules/timeline-monad";

const test_timeline_monad = () => {
  log("=Tonad ========= ");

  const a = (x: any) => x;
  //
  const Ta = T(a);
  const TTa = T(Ta);

  log("-----TTa === Ta----------------");
  log(
    Ta
  );
  log(
    TTa
  );
  log(
    TTa === Ta
  );
  log("===================");
  log(
    T(a).sync(T).valueOf()
  );
  log(
    T(a).sync(() => Ta).valueOf()
  );
  log(
    T(a).valueOf()
  );
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
    .sync((a: any) => a * 10)
    .sync((a: any) => a * 10);


  Ta[now] = 7;
  console.log(Ta[now]);
  console.log(b[now]);

  Ta[now] = 987;


  //---------------

  const timerTL = T((timeline: any) => {

    const f = () => { timeline[now] = "1 sec" };
    setTimeout(f, 1000);

  });

  timerTL.sync(console.log);
  //---------------------------------
  /*
    const fs = require("fs");
  
    const initTL = T();
  
    const fileRead = (dataTL: any) => {
  
      fs.readFile("package.json", "utf8",
        (err: any, text: string) => {
          dataTL[now] = text;
        });
  
      return initTL;
    };
  
    const print = (initTL: any) => {
      console.log("====================================");
      dataTL.sync(console.log);
  
      return initTL;
    };
  
    const tl = initTL
      .sync(fileRead)
      .sync(print);
  
    const dataTL = T();
    initTL[now] = dataTL;
  */
  //===========================
  {//----------------------------------------

    const allTL = (...TLs: any[]) => {
      const resultTL = T();
      const updateFlagTLs = TLs.map(
        (TL: any) => {
          const flagTL = T();
          flagTL[now] = 0;
          TL.sync(() => (flagTL[now] = 1) && updateCheck());
          return flagTL;
        }
      );
      const updateCheck = () => {
        const dummy = (updateFlagTLs
          .map((flagTL: any) => flagTL[now])
          .reduce((a: number, b: number) => (a * b))
          === 1) //all  updated
          ? resultTL[now] = TLs.map(TL => TL[now])
          : true;
      };
      return resultTL;
    };
    //-----------------------------------
    const a = T();
    const b = T();
    const ab = allTL(a, b);
    ab.sync(log);

    a[now] = 1;
    b[now] = 2;

  }//-------------------------------------

};


export { test_timeline_monad };