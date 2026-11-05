/** @type {import('jest').Config} */
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/e2e/", "/.next/"],
  projects: [
    {
      displayName: "unit",
      testEnvironment: "node",
      testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
      transform: {
        "^.+\\.ts$": [
          "ts-jest",
          {
            tsconfig: {
              esModuleInterop: true,
              strict: true,
              isolatedModules: true,
              moduleResolution: "node",
            },
          },
        ],
      },
    },
    {
      displayName: "ui",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/components/**/*.test.tsx"],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
      },
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            tsconfig: {
              esModuleInterop: true,
              strict: true,
              jsx: "react-jsx",
              isolatedModules: true,
              moduleResolution: "node",
            },
          },
        ],
      },
    },
  ],
};
