const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const beautify = require("js-beautify");
const replace = require("replace");
const pugCompiler = require("pug");
const nowTime = require("./currentTime");
const buildRoot = process.env.DEV_ROOT;
const indexFunc = require("./index");

let startTime, counter, record, recordX, recordXi, files;
counter = record = recordXi = 0;
(files = []), (recordX = []);

// https://www.npmjs.com/package/js-beautify
const beautifyOptions = {
  indent_size: 2,
  end_with_newline: true,
  preserve_newlines: true,
  max_preserve_newlines: 0,
  wrap_line_length: 0,
  wrap_attributes_indent_size: 0,
  unformatted: ["b", "em"],
};

const pug = ({ src, dist, data, isDev, event, file, logTask, logAction, logReset }) => {
  if (counter === 0) {
    !event && (event = "all");
    console.log(`${event !== "all" ? "\n" : ""}${nowTime()}■■ ${logTask}pug${logReset} task start ${logAction}[${event}]${logReset} >>`);
    startTime = Date.now();
  }
  counter++;

  const beautifyFn = (str) => ((isDev && process.env.DEV_BEAUTIFY === "true") || (!isDev && process.env.PRD_BEAUTIFY === "true") ? beautify.html(str, beautifyOptions) : str);

  glob("/**/[!_]*.pug", { root: src }, (err, filelist) => {
    if (err) {
      console.log(err);
      return;
    }

    const exCheck = file && /^_/.test(path.basename(file));

    (event === "add" || event === "change") && !exCheck && files.push(file);

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
        pugCompiler.renderFile(file, { basedir: src }, (err, str) => {
          if (err) {
            console.log(err);
            return;
          }
          const f = file.split(src);
          const pathFormat = path.parse(f[1]);
          pathFormat.ext = ".html";
          delete pathFormat.base;
          f[1] = path.format(pathFormat);
          const filename = dist + f[1];
          const dir = path.dirname(filename);
          !fs.existsSync(dir) && fs.mkdirsSync(dir);
          let result = beautifyFn(str);
          fs.writeFile(filename, result, (err) => {
            if (err) throw err;
            replace({
              regex: `/${buildRoot}/`,
              replacement: "/",
              paths: [filename],
              recursive: false,
              silent: true,
            });
            resultArr.push(f[1]);
            count++;
            count === length && finish(resultArr);
          });
        });
      });
    };

    const finish = function (resultArr) {
      const endTime = Date.now();
      const compileItems = resultArr.length > 1 ? resultArr.length + " items, " : "after ";
      event === "all" && console.log("");
      event === "all" && resultArr[0] && console.log(`${nowTime()}== compile all pug files ==`);
      resultArr[0] && console.log(resultArr.sort());
      // console.log( `== pug files : ${resultArr.join(", ")} ==` );
      console.log(`${nowTime()}>> ${logTask}pug${logReset} task finished ■■ ${compileItems}${endTime - startTime} ms`);
      files = [];
      counter = record = recordX.length = recordXi = 0;
      event === "all" && indexFunc.compileCheck("pug");
    };
  });
};

module.exports = pug;
