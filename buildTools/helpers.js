const fs = require('fs'),
  path = require('path'),
  //the following module is used to generate incremental IDs for every entry
  incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = generateNextId();

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

//link of our app directory
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  //generates unique names => a_b, g_i, .etc
  generateScopedName: (localName, resourcePath) => {
    const componentName = resourcePath.split('/').slice(-2, -1);

    return uniqueIdGenerator(componentName) + '_' + uniqueIdGenerator(localName);
  },
  //get directories list of the given directory
  getDirectoryDirectories: (dir) =>
    fs.readdirSync(dir).filter(function (file) {
      return fs.statSync(dir + '/' + file).isDirectory();
    }),
  //get files list of the given directory
  getDirectoryFiles: (dir) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name),
  //get required link
  resolveApp: (relativePath) => path.resolve(appDirectory, relativePath),
};
