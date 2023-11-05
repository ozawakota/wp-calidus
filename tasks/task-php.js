const fs = require("fs-extra");
const glob = require("glob");
const replace = require("replace");
const nowTime = require("./currentTime");
const buildRoot = process.env.DEV_ROOT;
const indexFunc = require("./index");

let startTime, counter, record, recordX, recordXi, files;
counter = record = recordXi = 0;
(files = []), (recordX = []);

const php = ({ src, dist, event, file, logTask, logAction, logReset }) => {
  if (counter === 0) {
    !event && (event = "all");
    console.log(`${event !== "all" ? "\n" : ""}${nowTime()}■■ ${logTask}php${logReset} task start ${logAction}[${event}]${logReset} >>`);
    startTime = Date.now();
  }
  counter++;

  glob("/**/[^_]*.php", { root: src }, (err, filelist) => {
    if (err) {
      console.log(err);
      return;
    }

    (event === "add" || event === "change") && file && files.push(file);

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
            if (recordY === counter) {
              filelist = files.length ? files : filelist;
              filelist.length ? execution() : finish([""]);
            }
          },
          150,
          recordX
        );
      }
    }, 0);

    const execution = function () {
      const resultArr = [];
      const { length } = filelist;
      let count = 0;
      filelist.forEach((file) => {
        const f = file.split(src);
        fs.copy(file, dist + f[1], (err) => {
          if (err) return console.error(err);
          replace({
            regex: `/${buildRoot}/`,
            replacement: "/",
            paths: [dist + f[1]],
            recursive: false,
            silent: true,
          });
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
      event === "all" && resultArr[0] && console.log(`${nowTime()}== compile all php files ==`);
      resultArr[0] && console.log(resultArr.sort());
      // console.log( `== php files : ${resultArr.slice(0, 10).join(", ") + more} ==` );
      console.log(`${nowTime()}>> ${logTask}php${logReset} task finished ■■ ${compileItems}${endTime - startTime} ms`);
      files = [];
      counter = record = recordX.length = recordXi = 0;
      event === "all" && indexFunc.compileCheck("php");
    };
  });
};

module.exports = php;
