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

  /**
   * Make SVGs available as components. This is a hacky insertion method, I would
   * normally rebuild the full rules array with my exact preferences instead of
   * just poking a new loader into the top
   **/
  config.module.rules[2].oneOf.unshift({
    test: /\.svg$/,
    use: [
      require.resolve("desvg-loader/react"),
      require.resolve("svg-loader"),
    ]
  });

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