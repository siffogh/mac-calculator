module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: './test/jestSetup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/**/*.{js}']
};
