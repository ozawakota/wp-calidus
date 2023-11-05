require("dotenv").config();
const fs = require("fs");
const path = require("path");
const bs = require("browser-sync").create();
const getFileData = require("./getFileData");

/************************************************v
my task
************************************************/
const dele = require("./task-dele");
const copy = require("./task-copy");
const watch = require("./task-watch");
const html = require("./task-html");
const pug = require("./task-pug");
const php = require("./task-php");
const image = require("./task-image");

/************************************************
check
************************************************/

const checkBoolean = (str) => (str == "true" ? true : str == "false" || str == "" ? false : str);
let compileChecks = [];
const compileList = ["copy", "dele", "html", "image", "php", "pug"];
const fileCheck = () => {
  const cssPath = paths.dist.css;
  const jsPath = paths.dist.js;
  const timer = setInterval(() => {
    fs.existsSync(cssPath) && fs.existsSync(jsPath) && watchTasks() & serverTask() & clearInterval(timer);
  }, 500);
};
exports.compileCheck = (task) => {
  compileChecks.push(task) & compileChecks.sort();
  compileList.toString() === compileChecks.toString() && isWatch && fileCheck();
};

/************************************************
config
************************************************/

const paths = require("./path.config");
const environment = process.env.NODE_ENV;
const isDev = environment === "development" ? true : false;
const isWatch = environment === "development" ? checkBoolean(process.env.DEV_WATCH) : checkBoolean(process.env.PRD_WATCH);
const copyFiletype = process.env.COPY_FILE.match(/,/) ? "{" + process.env.COPY_FILE + "}" : process.env.COPY_FILE;
const logTask = "\x1b[38;2;95;246;150m",
  logAction = "\x1b[36m",
  logReset = "\x1b[0m";

/************************************************
data
************************************************/

const data = getFileData(paths.src.assets + "/data/*.yaml");

/************************************************
tasks
************************************************/

const htmlTask = (event, file) => {
  const src = paths.src.root;
  const dist = paths.dist.root;
  html({
    src,
    dist,
    data,
    isDev,
    event,
    file,
    logTask,
    logAction,
    logReset,
  });
};
const pugTask = (event, file) => {
  const src = paths.src.root;
  const dist = paths.dist.root;
  pug({
    src,
    dist,
    event,
    file,
    logTask,
    logAction,
    logReset,
  });
};
const phpTask = (event, file) => {
  const src = paths.src.theme;
  const dist = paths.dist.theme;
  php({
    src,
    dist,
    event,
    file,
    logTask,
    logAction,
    logReset,
  });
};
const imgTask = (event, file) => {
  image(paths.src.img, paths.dist.img, "/**/*.{jpg,jpeg,png,gif,webp,svg,ico}", event, file, logTask, logAction, logReset);
  // copy(paths.src.img, paths.dist.img, "/**/*.{jpg,jpeg,png,gif,webp,svg,ico}", "img", event, file, logTask,logAction, logReset);
};
const copyTask = (event, file) => {
  copy(paths.src.root, paths.dist.root, `/**/[^_]*.${copyFiletype}`, "other", event, file, logTask, logAction, logReset);
};

const watchTasks = () => {
  watch(paths.src.root + "/**/*.{html,ejs}", (event, file) => {
    (event === "add" || event === "change" || event === "unlink") && htmlTask(event, file);
    if (event === "unlink" && !path.basename(file).startsWith("_")) {
      const pathFormat = path.parse(paths.dist.root + file.split(paths.src.root)[1]);
      pathFormat.ext = ".html";
      delete pathFormat.base;
      dele(paths.dist.root, [path.format(pathFormat)], "", logTask, logAction, logReset);
    }
  });
  watch(paths.src.root + "/**/*.pug", (event, file) => {
    (event === "add" || event === "change") && pugTask(event, file);
    if (event === "unlink" && !path.basename(file).startsWith("_")) {
      const pathFormat = path.parse(paths.dist.root + file.split(paths.src.root)[1]);
      pathFormat.ext = ".html";
      delete pathFormat.base;
      dele(paths.dist.root, [path.format(pathFormat)], "", logTask, logAction, logReset);
    }
  });
  watch(paths.src.theme + "/**/[^_]*.php", (event, file) => {
    (event === "add" || event === "change") && phpTask(event, file);
    event === "unlink" && dele(paths.dist.theme, [paths.dist.theme + file.split(paths.src.theme)[1]], "", logTask, logAction, logReset);
  });
  watch(paths.src.img + "/**/[^_]*.{jpg,jpeg,png,gif,webp,svg,ico}", (event, file) => {
    (event === "add" || event === "change") && imgTask(event, file);
    event === "unlink" && dele(paths.dist.img, [paths.dist.img + file.split(paths.src.img)[1] + "*"], "", logTask, logAction, logReset);
  });
  watch(paths.src.root + `/**/[^_]*.${copyFiletype}`, (event, file) => {
    (event === "add" || event === "change") && copyTask(event, file);
    event === "unlink" && dele(paths.dist.theme, [paths.dist.theme + file.split(paths.src.theme)[1]], "", logTask, logAction, logReset);
  });
};

const serverTask = () => {
  let bsOpen;
  if (process.argv[2]) {
    bsOpen = process.argv[2] === "false" ? false : process.argv[2];
  } else {
    bsOpen = process.env.BS_OPEN === "false" ? false : process.env.BS_OPEN;
  }
  let bsSetting = {
    open: bsOpen,
    notify: false,
    host: "localhost",
    ghostMode: false,
    https: false,
  };
  process.env.ENABLE_VHOST === "true" && process.env.VHOST ? (bsSetting["proxy"] = process.env.VHOST) : (bsSetting["server"] = { baseDir: paths.dist.root });
  process.env.BS_STARTPATH && (bsSetting["startPath"] = process.env.BS_STARTPATH);
  console.log("") & bs.init(bsSetting);

  bs.watch(paths.dist.root + "/**/*.html").on("change", bs.reload);
  bs.watch(paths.dist.theme + "/**/*.php").on("change", bs.reload);
  bs.watch(paths.dist.assets + "/**/*.js").on("change", bs.reload);
  bs.watch(paths.dist.assets + "/**/*.{jpg,jpeg,png,gif,webp,svg,ico}", (e) => {
    (e === "add" || e === "change" || e === "unlink") && bs.reload("*");
  });
  bs.watch(paths.dist.assets + "/**/*.json").on("change", bs.reload);
  bs.watch(paths.dist.assets + "/**/*.css", (e, f) => {
    e === "change" && bs.reload("*.css");
  });
};

const delList = [];
const themeDir = paths.dist.theme.split(paths.dist.root)[1];
const themeDirList = themeDir.split(path.sep).filter(Boolean);
const themeDirLen = themeDirList.length;
for (let i = 0; i < themeDirLen; i++) {
  delList.unshift(paths.dist.root + "/" + path.join.apply(null, themeDirList) + "/*");
  delList.unshift("!" + paths.dist.root + "/" + path.join.apply(null, themeDirList));
  themeDirList.pop();
}
delList.unshift(paths.dist.root + "/**");

dele(paths.dist.root, delList, "all", logTask, logAction, logReset).then(() => {
  htmlTask();
  pugTask();
  phpTask();
  imgTask();
  copyTask();
});
