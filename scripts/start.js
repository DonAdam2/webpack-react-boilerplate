//the following required to start the dev server
const clc = require('cli-color');
const { detect } = require('detect-port');
const prompts = require('prompts');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { port } = require('../buildTools/constants');
const webpackConfig = require('../buildTools/webpack.dev');
//required to have colored messages in the terminal
//used to enforce user input
//used to detect if the selected port is in use or not and to suggest the next available port

//constants

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
