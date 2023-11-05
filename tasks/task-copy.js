const fs = require("fs-extra");
const glob = require("glob");
const nowTime = require("./currentTime");
const indexFunc = require("./index");

let startTime, counter, record, recordX, recordXi, files;
(startTime = {}), (files = {}), (recordX = {}), (counter = {}), (record = {}), (recordXi = {});

const copy = (rootSrcDir, rootDistDir, src, taskName, event, file, logTask, logAction, logReset) => {
  if (!counter[taskName]) {
    counter[taskName] = record[taskName] = recordXi[taskName] = 0;
    (files[taskName] = []), (recordX[taskName] = []);
  }
  if (counter[taskName] === 0) {
    !event && (event = "all");
    console.log(`${event !== "all" ? "\n" : ""}${nowTime()}■■ ${logTask}copy${logReset} task start ${logAction}[${event}]${logReset} >>`);
    startTime[taskName] = Date.now();
  }
  counter[taskName]++;

  glob(src, { root: rootSrcDir }, (err, filelist) => {
    if (err) {
      console.log(err);
      return;
    }

    if ((event === "add" || event === "change") && file) files[taskName].push(file);

    setTimeout(() => {
      record[taskName]++;
      // const nowTime = Date.now() - startTime[taskName];
      // console.log(taskName, { counter: counter[taskName], record: record[taskName], nowTime });
      if (record[taskName] === counter[taskName]) {
        recordX[taskName].push(record[taskName]);
        setTimeout(
          () => {
            const recordY = recordX[taskName][recordXi[taskName]];
            recordXi[taskName]++;
            // recordY === counter[taskName] ? console.log("same !!!", taskName, { counter: counter[taskName], recordY, recordXi: recordXi[taskName] }) : console.log("non ...", taskName, { counter: counter[taskName], recordY, recordXi: recordXi[taskName] });
            // recordY === counter[taskName] && execution();
            if (recordY === counter[taskName]) {
              filelist = files[taskName].length ? files[taskName] : filelist;
              filelist.length ? execution() : finish([""]);
            }
          },
          150,
          recordX[taskName]
        );
      }
    }, 0);

    const execution = function () {
      const resultArr = [];
      const { length } = filelist;
      let count = 0;
      filelist.forEach((file) => {
        const f = file.split(rootSrcDir);
        fs.copy(file, rootDistDir + f[1], (err) => {
          if (err) return console.error(err);
          resultArr.push(f[1]);
          count++;
          count === length && finish(resultArr);
        });
      });
    };

    const finish = function (resultArr) {
      const endTime = Date.now();
      const compileItems = resultArr.length > 1 ? resultArr.length + " items, " : "after ";
      event === "all" && console.log("");
      event === "all" && resultArr[0] && console.log(`${nowTime()}== copy all files ==`);
      resultArr[0] && console.log(resultArr.sort());
      console.log(`${nowTime()}>> ${logTask}copy${logReset} task finished ■■ ${compileItems}${endTime - startTime[taskName]} ms`);
      files[taskName] = [];
      counter[taskName] = record[taskName] = recordX[taskName].length = recordXi[taskName] = 0;
      event === "all" && indexFunc.compileCheck("copy");
    };
  });
};

module.exports = copy;
