const {
    outputDirectory,
    rootDirectory,
    publicDirectory,
    environmentsDirectory,
    jestDirectory,
  } = require('./constants'),
  { resolveApp } = require('./helpers');

module.exports = {
  srcPath: resolveApp(rootDirectory),
  appIndexPath: resolveApp(`${rootDirectory}/index`),
  jsDirectoryPath: resolveApp(`${rootDirectory}/js`),
  stylesDirectoryPath: resolveApp(`${rootDirectory}/scss`),
  swSourcePath: resolveApp(`${rootDirectory}/serviceWorker/swSource`),
  swIconPath: (imageSrc) => resolveApp(`${rootDirectory}/${imageSrc}`),
  publicDirPath: resolveApp(publicDirectory),
  indexHtmlPath: resolveApp(`${publicDirectory}/index.html`),
  jestPath: resolveApp(jestDirectory),
  outputSrcPath: resolveApp(outputDirectory),
  envDevelopmentPath: resolveApp(`${environmentsDirectory}/.env.development`),
  envProductionPath: resolveApp(`${environmentsDirectory}/.env`),
};
