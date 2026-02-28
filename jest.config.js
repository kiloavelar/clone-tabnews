const nextJest = require("next/jest");
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env.development",
});
const createJestConfig = nextJest(
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  "./",
);
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/tests/orchestrator.js"],
  testTimeout: 60000,
});

module.exports = jestConfig;
