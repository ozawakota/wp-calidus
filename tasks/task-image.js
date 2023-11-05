require("dotenv").config();
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const imagemin = require("imagemin-keep-folder");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const gifsicle = require("imagemin-gifsicle");
const svgo = require("imagemin-svgo");
const nowTime = require("./currentTime");
const indexFunc = require("./index");

let startTime, counter, record, recordX, recordXi, files, srcSize, distSize, webpSrcSize, webpDistSize, allFileList;
counter = record = recordXi = srcSize = distSize = webpSrcSize = webpDistSize = 0;
(files = []), (recordX = []);

const UnitChange = (size, byte, unit) => {
  const newSize = byte !== null ? Math.floor((size / byte) * Math.pow(10, 2)) / Math.pow(10, 2) : size;
  return newSize.toFixed(2) + " " + unit;
};

const getTarget = (size) => {
  const kb = 1024;
  const mb = Math.pow(kb, 2);
  const gb = Math.pow(kb, 3);
  const tb = Math.pow(kb, 4);

  const returnData = (byte, unit) => ({ byte, unit });

  if (size >= tb) return returnData(tb, "TB");
  if (size >= gb) return returnData(gb, "GB");
  if (size >= mb) return returnData(mb, "MB");
  if (size >= kb) return returnData(kb, "KB");

  return returnData(null, "byte");
};

const makeWebp = async (rootSrcDir, rootDistDir, files, event, resultArrLog, fileSize, logTask, logReset) => {
  const webp = (await import("imagemin-webp")).default;
  const resultList = files.flatMap((file) => {
    const filePath = path.parse(file);
    if (filePath.ext === ".*") {
      filePath.base = "*.{jpg,jpeg,png}";
      file = path.format(filePath);
    } else if (!(filePath.ext === ".jpg" || filePath.ext === ".jpeg" || filePath.ext === ".png")) {
      file = [];
    }
    return file;
  });
  await imagemin(resultList, {
    plugins: [
      webp({
        quality: Number(process.env.WEBP_QUALITY),
      }),
    ],
    replaceOutputDir: (output) => {
      return output.replace(rootSrcDir, rootDistDir);
    },
  }).then(() => {
    for (var i = 0, j = 0; i < resultList.length; i++) {
      const srcParse = path.parse(resultList[i]);
      srcParse.base = "";
      srcParse.ext = ".webp";
      const webpPath = path.format(srcParse);
      if (fs.existsSync(webpPath.replace(rootSrcDir, rootDistDir))) {
        j++;
        webpSrcSize += fs.statSync(resultList[i]).size;
        webpDistSize += fs.statSync(webpPath.replace(rootSrcDir, rootDistDir)).size;
      }
    }
    fileSize[1] = { src: webpSrcSize, dist: webpDistSize, num: j, name: "Create WebP" };
    event === "all" && indexFunc.compileCheck("image");
    endTask(event, resultArrLog, fileSize, logTask, logReset);
    webpSrcSize = webpDistSize = 0;
  });
  glob("/**/*.webp", { root: rootDistDir, ignore: ["**/*.jpg.webp", "**/*.jpeg.webp", "**/*.png.webp"] }, (err, distFiles) => {
    if (err) {
      console.log(err);
      return;
    }
    distFiles.map((file) => {
      let ext;
      const f = file.split(rootDistDir);
      const g = f[1].split(path.parse(f[1]).ext);
      glob(rootSrcDir + g[0] + ".*", function (err, files) {
        if (err) {
          console.log(err);
          return;
        }
        ext = path.extname(files[0]);
        const filename = path.basename(file, ".webp");
        const newPath = path.join(path.dirname(file), `${filename}${ext}.webp`);
        fs.renameSync(file, newPath);
      });
    });
  });
};

const image = async (rootSrcDir, rootDistDir, src, event, file, logTask, logAction, logReset) => {
  if (counter === 0) {
    !event && (event = "all");
    console.log(`${event !== "all" ? "\n" : ""}${nowTime()}■■ ${logTask}image${logReset} task start ${logAction}[${event}]${logReset} >>`);
    startTime = Date.now();
  }
  counter++;

  (event === "add" || event === "change") && file ? files.push(file) : getAllFile();

  function getAllFile() {
    files = [`${rootSrcDir}/**/[^_]*.*`];
    glob(`${rootSrcDir}/**/[^_]*.*`, (err, allFiles) => {
      if (err) {
        console.log(err);
        return;
      }
      allFileList = allFiles;
    });
  }

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
    imagemin(files, {
      plugins: [
        mozjpeg({
          quality: Number(process.env.JPG_QUALITY),
        }),
        pngquant({
          quality: process.env.PNG_QUALITY.split(",").map((str) => Number(str) / 100),
        }),
        gifsicle(),
        svgo({
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        }),
      ],
      replaceOutputDir: (output) => {
        return output.replace(rootSrcDir, rootDistDir);
      },
    }).then(() => {
      let resultArrLog = [];
      if (event === "all") {
        files = allFileList;
      }
      for (var i = 0; i < files.length; i++) {
        srcSize += fs.statSync(files[i]).size;
        distSize += fs.statSync(files[i].replace(rootSrcDir, rootDistDir)).size;
        const f = files[i].split(rootSrcDir);
        resultArrLog.push(f[1]);
      }
      const fileSize = new Object();
      fileSize[0] = { src: srcSize, dist: distSize, num: i, name: "imagemin" };
      process.env.MAKE_WEBP === "true" ? makeWebp(rootSrcDir, rootDistDir, files, event, resultArrLog, fileSize, logTask, logReset) : indexFunc.compileCheck("image") & endTask(event, resultArrLog, fileSize, logTask, logReset);
      srcSize = distSize = 0;
    });
  };
};

const endTask = (event, resultArrLog, fileSize, logTask, logReset) => {
  const endTime = Date.now();
  const compileItems = resultArrLog.length > 1 ? resultArrLog.length + " items, " : "after ";
  event === "all" && console.log("");
  event === "all" && resultArrLog[0] && console.log(`${nowTime()}== optimize all images ==`);
  resultArrLog[0] && console.log(resultArrLog.sort());
  console.log(`${nowTime()}>> ${logTask}image${logReset} task finished ■■ ${compileItems}${endTime - startTime} ms`);
  const { byte, unit } = getTarget(fileSize[0]["src"]);
  for (let i = 0; i < Object.keys(fileSize).length; i++) {
    const perSize = Math.floor((fileSize[i]["dist"] / fileSize[i]["src"]) * 100 * 10) / 10;
    console.log(UnitChange(fileSize[i]["src"], byte, unit) + " => " + UnitChange(fileSize[i]["dist"], byte, unit) + " (" + perSize.toFixed(1) + "%) " + fileSize[i]["num"] + " items " + fileSize[i]["name"]);
  }
  files = [];
  counter = record = recordX.length = recordXi = 0;
};

module.exports = image;
