const path = require('path');
const util = require("util");
const postcssImport = require("postcss-import");
const postcssNested = require("postcss-nested");
const postcssCustomMedia = require("postcss-custom-media");
const postcssFlexbugFixes = require("postcss-flexbugs-fixes");
const postcssPresetEnv = require("postcss-preset-env");

const printObject = obj => console.log(util.inspect(obj, {
  showHidden: false,
  depth: null
}));

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  // set up relative paths for easier importing and refactoring
  config.resolve.modules.push(path.resolve('./src'));

  // re-configure postcss with some convenient helpers
  require('react-app-rewire-postcss')(config, {
    plugins: [
      postcssImport,
      postcssNested,
      postcssCustomMedia,
      postcssFlexbugFixes,
      postcssPresetEnv({
        autoprefixer: {
          grid: true,
          flexbox: "no-2009"
        },
        stage: 0
      })
    ]
  });

  return config;
};