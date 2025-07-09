const path = require("path");

module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  setupFiles: [path.resolve(__dirname, "test", "jest.setup.env.js")],

  // Corrige resolução de paths como 'src/...'
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
