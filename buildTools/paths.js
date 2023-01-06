const path = require('path'),
  // __dirname is the absolute path to the root directory of our app
  projectPath = `${path.join(__dirname)}/../`,
  {
    outputDirectory,
    rootDirectory,
    publicDirectory,
    environmentsDirectory,
    jestDirectory,
  } = require('./constants');

module.exports = {
  srcPath: path.join(projectPath, rootDirectory),
  publicDirPath: path.join(projectPath, publicDirectory),
  jestPath: path.join(projectPath, jestDirectory),
  outputSrcPath: path.resolve(projectPath, outputDirectory),
  environmentsPath: path.resolve(projectPath, environmentsDirectory),
};
