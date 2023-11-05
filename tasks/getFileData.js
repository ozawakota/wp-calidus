const glob = require("glob");
const yaml = require("js-yaml");
const fs = require("fs");

const getFileData = (src) => {
  const paths = glob.sync(src, {});
  let data = {};
  paths.forEach((file) => {
    const result = yaml.load(fs.readFileSync(file, "utf8"));
    data = { ...data, ...result };
  });
  return data;
};

module.exports = getFileData;
