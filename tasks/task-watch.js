const chokidar = require("chokidar");

const watch = (src, cb) => {
  const watcher = chokidar.watch(src, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 1500,
      pollInterval: 100,
    },
  });
  watcher.on("all", (event, path) => cb(event, path));
};

module.exports = watch;
