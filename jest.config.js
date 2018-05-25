module.exports = {
  verbose: true,
  setupFiles: ['./test/jestSetup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/**/*.{js}']
};
