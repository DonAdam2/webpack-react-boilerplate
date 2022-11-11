//the following required to start the dev server
const Webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  webpackConfig = require('../buildTools/webpack.dev'),
  //required to have colored messages in the terminal
  clc = require('cli-color'),
  //used to enforce user input
  prompts = require('prompts'),
  //used to detect if the selected port is in use or not and to suggest the next available port
  detect = require('detect-port'),
  //constants
  { port } = require('../buildTools/constants');

function checkPort() {
  return new Promise((resolve) => {
    detect(port, (err, suggestedPort) => {
      if (err) {
        clc.red('The following error occurred while detecting the port');
        console.log(err);
      }

      if (port === suggestedPort) {
        //the selected port is not occupied
        resolve(port);
      } else {
        const question = {
          type: 'confirm',
          name: 'shouldChangePort',
          message:
            clc.yellow(`Something is already running on port ${port}.`) +
            '\n\nWould you like to run the app on another port instead?',
          initial: true,
        };
        prompts(question).then((answer) => {
          if (answer.shouldChangePort) {
            resolve(suggestedPort);
          } else {
            resolve(null);
          }
        });
      }
    });
  });
}

checkPort()
  .then((returnedPort) => {
    if (returnedPort === null) {
      return;
    }
    const config = webpackConfig(
        { WEBPACK_SERVE: true },
        {
          mode: 'development',
          port: returnedPort,
        }
      ),
      compiler = Webpack(config),
      devServerOptions = { ...config.devServer },
      server = new WebpackDevServer(devServerOptions, compiler);

    (async () => {
      await server.start();
    })();
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
