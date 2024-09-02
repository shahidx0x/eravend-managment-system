/* eslint-disable */
// export default {
//   displayName: "web",
//   preset: "../../jest.preset.js",
//   transform: {
//     "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nx/react/plugins/jest",
//     "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@nx/next/babel"] }],
//   },
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
//   coverageDirectory: "../../coverage/apps/web",
// };

export default {
  displayName: "web",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": ["babel-jest", {
      presets: ["@nx/next/babel"],
      plugins: [
        ["@babel/plugin-syntax-import-assertions", false],
        ["@babel/plugin-syntax-import-attributes", false]
      ]
    }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/apps/web",
};


