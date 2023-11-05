const del = require("del");
const nowTime = require("./currentTime");
const indexFunc = require("./index");

let startTime, counter, record, recordX, recordXi, files;
counter = record = recordXi = 0;
(files = []), (recordX = []);

const dele = async (dist, file, event, logTask, logAction, logReset) => {
  if (counter === 0) {
    const eventAll = event ? ` ${logAction}[all]${logReset}` : "";
    console.log(`\n${nowTime()}■■ ${logTask}delete${logReset} task start${eventAll} >>`);
    startTime = Date.now();
  }
  counter++;

  files.push(file[0]);
  // console.log({ files });
  del.sync(file, { force: false });

  setTimeout(() => {
    record++;
    // const nowTime = Date.now() - startTime;
    // console.log({ counter, record, nowTime });
    if (record === counter) {
      recordX.push(record);
      setTimeout(
        () => {
          const recordY = recordX[recordXi];
          recordXi++;
          // recordY === counter ? console.log("same !!!", { counter, recordY, recordXi }) : console.log("non ...", { counter, recordY, recordXi });
          recordY === counter && execution();
        },
        150,
        recordX
      );
    }
  }, 0);

  const execution = function () {
    let resultArrLog = [];
    for (var i = 0; i < files.length; i++) {
      const f = files[i].split(dist);
      resultArrLog.push(f[1]);
    }
    const endTime = Date.now();
    const compileItems = resultArrLog.length > 1 ? resultArrLog.length + " items, " : "after ";
    event === "all" && console.log(`\n${nowTime()}== delete all files ==`);
    console.log(resultArrLog.sort());
    // console.log( `== delete files : ${f} ==` );
    console.log(`${nowTime()}>> ${logTask}delete${logReset} task finished ■■ ${compileItems}${endTime - startTime} ms`);
    files = [];
    counter = record = recordX.length = recordXi = 0;
    event === "all" && indexFunc.compileCheck("dele");
    return;
  };
};

module.exports = dele;
