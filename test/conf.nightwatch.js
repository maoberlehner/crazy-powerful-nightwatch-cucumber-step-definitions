const nightwatchCucumber = require(`nightwatch-cucumber`);

nightwatchCucumber({
  cucumberArgs: [
    `--require`, `test/hooks.js`,
    `--require`, `test/step-definitions`,
    `--format`, `node_modules/cucumber-pretty`,
    `--format`, `json:./test/reports/cucumber.json`,
    `test/features`,
  ],
});

module.exports = {
  output_folder: `test/reports`,
  selenium: {
    start_process: false,
  },
  globals_path: `test/globals.js`,
  test_settings: {
    default: {
      selenium_port: 9515,
      selenium_host: `localhost`,
      default_path_prefix: ``,
      desiredCapabilities: {
        browserName: `chrome`,
        chromeOptions: {
          args: [`artifacts-dir=./test/reports/screenshots`],
        },
      },
    },
  },
};
