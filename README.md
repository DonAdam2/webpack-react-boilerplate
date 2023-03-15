# Table of Contents:
- [Overview](#this-webpack-v5761-boilerplate-supports-the-following)
- [Prerequisites](#prerequisites)
- [Installing & getting started](#installing--getting-started)
- [Windows subsystem for Linux (WSL2)](#windows-subsystem-for-linux-wsl2-for-docker)
- [Available React configuration](#available-react-configurations)
- [Available Jest mocks](#available-jest-mocks)
- [Available aliases](#available-aliases)
- [Environments](#environments)
- [Enable CSS modules](#enable-css-modules)
- [Enable HTTPS in development](#enable-https-in-development-yarn-start)
- [Enable PWA (production only)](#enable-pwa-yarn-generate-progressivewebapp)
- [Configuring prettier](#configuring-prettier)
- [Site meta tags](#site-meta-tags)
- [Extras](#extras)
- [Code generator](#code-generator-using-plop)
- [Available scripts](#available-scripts)

## This webpack (V5.76.1) boilerplate supports the following:

- Testing using **jest**, **react-testing-library**
- **SCSS** preprocessor
- Autoprefixer for CSS (it supports IE >= 11)
- Hot reloading for **JS** & **CSS** and **redux** store (in development)
- Prettier (for code format)
- Docker setup for development
- Docker setup for production (basic setup **using nginx**)

## Prerequisites:

- nodeJS > 14.X.X or Docker

## Installing / Getting Started:

### Development (locally):

- Clone repo => `git clone git@github.com:DonAdam2/webpack-react-boilerplate.git`
- Navigate to project directory `cd webpack-react-boilerplate`
- Install dependencies => `yarn install`
- Start the development server => `yarn start`

### Development (using Docker):

- Clone repo => `git clone git@github.com:DonAdam2/webpack-react-boilerplate.git`
- Navigate to project directory `cd webpack-react-boilerplate`
- Install dependencies (required for prettier) => `yarn install`
- Start the development server => `docker-compose up web-dev`

### Windows subsystem for linux "WSL2" (for Docker):

- If you are using Windows 11 or 10, it's recommended to use WSL2:
  - [Install WSL on windows](https://pureinfotech.com/install-wsl-windows-11/)
  - [Install docker on windows](https://docs.docker.com/desktop/install/windows-install/)
  - Open docker desktop app:
    - settings => resources => WSL integration => enable required Ubuntu integration
  - [Setup SSH keys (if you want) on windows and share it with WSL](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/)
  - Create a new directory in ubuntu:
  ```
  mkdir workspace
  cd workspace
  ```
  - Clone this repo into the selected Ubuntu:
  ```
  git clone git@github.com:DonAdam2/webpack-react-boilerplate.git
  ```
  - Install curl in Ubuntu:
  ```
  sudo apt-get install curl
  ```
  - Install nvm:
  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  ```
  - Install required node version:
  ```
  nvm install --lts
  ```
  - Install yarn globally:
  ```
  npm install -g yarn
  ```
  - Update permissions to be able to install NPM packages
  ```
  sudo chown -R $(whoami) ~/workspace/webpack-react-boilerplate
  ```
  - Install packages (for linting purposes):
  ```
  yarn install
  ```
  - Run docker for development:
  ```
  docker-compose up web-dev
  ```

## Docker for production (_basic setup_) (modify it to your needs):
- Update the **_production_** section of the **_Dockerfile_** to meet your needs
- Run the following command to build your image => `docker-compose up web-prod`

## Available React configurations:

- React router dom v6
- Redux toolkit with Redux logger & Redux devTool
- 2 environments {production: .env, development: .env.development}

## Available Jest mocks:

- RenderWithRedux => overrides the render method of RTL with redux
- RenderWithReactIntl => overrides the render method of RTL with react-intl provider (if you are using it you need to download it)
- RenderWithRouter => overrides the render method of RTL with react router
- RenderWithProviders => overrides the render method of RTL with all providers

## Available aliases:
- @/jest => for the jest directory
- @/js => for the JS directory
- @/scss => for the SCSS directory
- @/public => for the public directory, (don't forget to prepend the **tilde** symbol in scss files):
  ```
  background-image: url('~@/public/asstes/images/favicon.png');
  ```
  ```
  @font-face {
    font-family: 'Roboto';
    src: url('~@/public/asstes/fonts/Roboto-Regular.ttf');
  }
  ```

## Environments:

### Available environments:
- Development => _.env.development_
- Production => _.env_

### Override environment files:

#### Development:
- Create a file with the chosen env extension in **/environments** directory, .e.g `.env.local`
- Install **env-cmd** package
- Update your start script `"start": "env-cmd -f environments/.env.local node scripts/start.js",`

#### Production:
- Create a file with the chosen env extension in **/environments** directory, .e.g `.env.prod`
- Install **env-cmd** package
- Update your build script `"build": "env-cmd -f environments/.env.prod webpack --config buildTools/webpack.prod.js --progress --color"`

#### Staging (new production environment):
- Create a file with the chosen env extension in **/environments** directory, .e.g `.env.staging`
- Install **env-cmd** package
- Add a new build script `"build:staging": "env-cmd -f environments/.env.staging webpack --config buildTools/webpack.prod.js --progress --color"`

### Update environment variables:

Please keep in mind that environment variables configured using webpack which means that you need to re-run the corresponding environment script (yarn start, yarn build) if you update the environment file.

## Enable CSS modules:
### Each component has its own styles "no conflict between different components styles"

- Open **/buildTools/constants.js** and set **isCssModules** to true
- Then in every component add the required import as follows:
  ```
  import classes from './scss/requiredStyles'
  ```

## Enable HTTPS in development `yarn start`

Add `set HTTPS=true` to `yarn start` script => `"start": "set HTTPS=true && node scripts/start.js"`

## Enable PWA `yarn generate progressiveWebApp`

- Run the given script to add the required files for progressive web app
- Install the following packages:
  
  ```
  yarn add -D workbox-webpack-plugin workbox-cacheable-response workbox-core workbox-expiration workbox-precaching workbox-routing workbox-strategies workbox-window copy-webpack-plugin
  ```
- Add **pwa** directory `/public/assets/images/pwa`, then add your PWA images using the following names:
  - icon-192x192.png
  - icon-256x256.png
  - icon-384x384.png
  - icon-512x512.png
- Open `/public/manifest.json` and update the following:
  - start_url (indicates what page should launch when someone opens your progressive web app.)
  - theme_color (This sometimes affects how the OS displays the site (e.g., on Android's task switcher, the theme color surrounds the site).)
  - background_color (tells the browser what color to use on the startup splash screen that users will see when they launch your app.)
  - name
  - short_name
  - description
  - orientation (you can enforce the orientation of your app, it can be ommited.)
  - categories (This is intended to be used by app stores to categorize your app.)
- Open `/public/index.html` and update **theme-color** meta tag if you updated **theme_color** in **manifest.json** file
- Update **cache APIs** section as needed in `/src/serviceWorker/swSource` file
- You are good to go.

**Notes**:

- If you get the following error in production:
  ```
  Uncaught (in promise) bad-precaching-response: 
  bad-precaching-response :: [{"url":"https:
  ```
  - Add the given package or file in exclude array of [InjectManifest](https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/#type-InjectManifest) plugin in `/buildTools/webpack.prod.js` as follows:
  ```
  new InjectManifest({
    //this is the source of your service worker setup
    swSrc: \`\${PATHS.src}/serviceWorker/swSource\`,
    dontCacheBustURLsMatching: ${dontCacheBustURLsMatching},         
    // Bump up the default maximum size (2mb) to (5mb) that's precached,
    // to make lazy-loading failure scenarios less likely.
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    //this is the output name of your service worker file
    swDest: 'serviceWorker.js',
    exclude: ['fileName'],
  }),`,
  ```

## Configuring Prettier

This build relies on [Prettier formatter](https://prettier.io/) to enforce code style. And [ESLint](https://eslint.org/) for identifying problematic patterns found in the code.

- Setting up prettier:

  1- You can find steps on how to set up prettier formatter with WebStorm/PhpStorm [here](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher).

  **Notes**:

  - It's better to use the local `node_modules` version of prettier instead of a global one, to avoid version conflicts (in case the globally installed version does not match the version specified in `package.json`).

  2- Follow the next steps to set up **prettier** and **eslint** in **_VS Code_**:

  - Install `prettier` plugin

  - Install `eslint` plugin

  - Open **_VS Code settings_** `CTRL + ,`:

    a- Search for `formatter` => check **Format on save**

    b- Search for `prettier` => add `.prettierrc` in **_Prettier: Config Path_** section && check **_Prettier: Require Config_**

  3- Please refer to other tutorials if you are using a different IDE.

## Site meta tags:

- This app includes search engines, Facebook, Twitter and regular meta tags

#### To update them:

- Open **_/buildTools/constants.js_** file and update metaInfo object
- Open **_public/assets/images_** and replace (favicon.png, metaImage.jpg) with your images but using the same name

  **Notes**:

  - It's very important to set `PRODUCTION_DOMAIN` in any production environment file, to generate site meta tags correctly
  - `PRODUCTION_DOMAIN` is the domain of your deployed app

## Extras:

- Private route guard => protect the given route based on a token.
- Public route guard => used for public routes and authentication routes (ex: login, signup, ...etc) {if authenticated it will redirect the user to the home page}
- Restricted route guard => protect the given route based on a token, and a list of permissions (can be an array or a string).
- Restricted section => protect the given section based on a list of permissions (can be an array or a string).
- Generic error boundary fallback component (you can customize it)
- Cookies, local storage and sessions storage mangers to store data in the browser. (**Note:** the data is encrypted using crypto-js package before storing it.)
- Basic mixins `(scss/generic/_mixins.scss)`
- Normalize styles `(scss/generic/_normalize.scss)`
- App typography styles `(scss/generic/_typography.scss)`
- 4 break points `(scss/generic/_variables.scss)`

## Code generator (using plop):
### It allows you to generate the following (yarn generate):
- Components
- Containers
- Pages
- Custom hooks
- Services
- Reducers
- progressiveWebApp

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
It will open [http://localhost:3000](http://localhost:3000) automatically in the browser to see your app.

All changes will be injected automatically without reloading the page.<br>

You will see in the console the following:

- All redux store related changes
- Any of the following errors:
  1. Linting errors.
  2. Code format errors (because of [prettier](https://prettier.io/))

### `yarn build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn build:serve`

Serves the app on `http://localhost:8080/` from the `dist` folder to check the production version.

**_Note:_** Use this script only if you ran the build script `yarn build`.

### `yarn analyze-bundle`

It allows you to analyze the bundle size.

### `yarn test`

It runs all test files.

### `yarn test:watch`

- It runs all unit test files in `/src` directory using watch mode.
- Will run all your tests once then again on every change of your source code

### `yarn test:coverage`

It runs test coverage.

### `yarn test:clear`

Clears test cache.

### `yarn generate` **_component_** || **_container_** || **_page_** || **_hook_** || **_service_** || **_reducer_** || **_progressiveWebApp_**

- It creates a boilerplate for component, container, page, custom hook, service, reducer or progressive web app setup.
