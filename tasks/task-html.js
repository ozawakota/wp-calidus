const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const beautify = require("js-beautify");
const replace = require("replace");
const ejs = require("ejs");
const nowTime = require("./currentTime");
const buildRoot = process.env.DEV_ROOT;
const indexFunc = require("./index");

let startTime, counter, record, recordX, recordXi, files, errFiles;
counter = record = recordXi = 0;
(files = []), (recordX = []), (errFiles = []);

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

const html = ({ src, dist, data, isDev, event, file, logTask, logAction, logReset }) => {
  if (event === "unlink") {
    errFiles.indexOf(file) != -1 && errFiles.splice(errFiles.indexOf(file), 1);
    return;
  }
  if (counter === 0) {
    !event && (event = "all");
    console.log(`${event !== "all" ? "\n" : ""}${nowTime()}■■ ${logTask}html${logReset} task start ${logAction}[${event}]${logReset} >>`);
    startTime = Date.now();
  }
  counter++;

  const beautifyFn = (str) => ((isDev && process.env.DEV_BEAUTIFY === "true") || (!isDev && process.env.PRD_BEAUTIFY === "true") ? beautify.html(str, beautifyOptions) : str);

  glob("/**/[^_]*.{html,ejs}", { root: src }, (err, filelist) => {
    if (err) {
      console.log(err);
      return;
    }

    const exCheck = file && /^_/.test(path.basename(file));

    (event === "add" || event === "change") && file.split(".").pop() === "html" && !exCheck && files.push(file);

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
      if (event && files.length) filelist = files;
      filelist = Array.from(new Set(filelist.concat(errFiles)));
      const resultArr = [];
      const { length } = filelist;
      let count = 0;
      filelist.forEach((file) => {
        const absolutePath = file.split(src)[1];
        const relativePath = "../".repeat([absolutePath.split(path.sep).length - 2]);
        const resultCheck = (resultArr) => {
          count++;
          count === length && finish(resultArr);
        };
        ejs.renderFile(
          file,
          { data, absolutePath, relativePath, time: new Date().getTime() },
          {
            includer: (originalPath, parsedPath) => {
              let modifiedFilename = /^\//.test(originalPath) ? path.join(src, originalPath) : parsedPath;
              return { filename: modifiedFilename };
            },
            outputFunctionName: "echo",
            rmWhitespace: false,
          },
          (err, str) => {
            if (err) {
              console.log(err);
              console.log(`${nowTime()}\x1b[31mCOMPILE ERROR !\x1b[0m`, [path.basename(file)]);
              errFiles.indexOf(file) == -1 && errFiles.push(file);
              files = [];
              resultCheck([""]);
              return;
            }
            errFiles.indexOf(file) != -1 && errFiles.splice(errFiles.indexOf(file), 1);
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
              resultCheck(resultArr);
            });
          }
        );
      });
    };

    const finish = function (resultArr) {
      const endTime = Date.now();
      const compileItems = resultArr.length > 1 ? resultArr.length + " items, " : "after ";
      event === "all" && console.log("");
      event === "all" && resultArr[0] && console.log(`${nowTime()}== compile all html files ==`);
      resultArr[0] && console.log(resultArr.sort());
      // console.log( `== html files : ${resultArr.join(", ")} ==` );
      console.log(`${nowTime()}>> ${logTask}html${logReset} task finished ■■ ${compileItems}${endTime - startTime} ms`);
      files = [];
      counter = record = recordX.length = recordXi = 0;
      event === "all" && indexFunc.compileCheck("html");
    };
  });
};

module.exports = html;
