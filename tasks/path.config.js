require("dotenv").config();
const path = require("path");
const environment = process.env.NODE_ENV;
const buildRoot = environment === "development" ? process.env.DEV_ROOT : process.env.PRD_ROOT;
const rootDir = process.cwd();
const pr = (str) => {
  return path.resolve(str);
};
const paths = {
  src: {
    root: pr(`${rootDir}/src`),
    theme: pr(`${rootDir}/src${process.env.THEME_PATH}`),
    assets: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}`),
    js: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/js`),
    css: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/scss`),
    img: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/images`),
    json: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/json`),
    font: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/fonts`),
    movie: pr(`${rootDir}/src${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/movie`),
  },
  dist: {
    root: pr(`${rootDir}/${buildRoot}`),
    theme: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}`),
    assets: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}`),
    js: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/js`),
    css: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/css`),
    img: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/images`),
    json: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/json`),
    font: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/fonts`),
    movie: pr(`${rootDir}/${buildRoot}${process.env.THEME_PATH}/${process.env.ASSETS_DIR}/movie`),
  },
};

module.exports = paths;
