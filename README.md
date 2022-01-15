## This webpack (V5.66.0) boilerplate supports the following:

- Testing using **mocha**, **chai**, **enzyme**
- **SCSS** preprocessor
- To enable **CSS modules** (each component has it's own styles "no conflict between different components styles") => just open (webpack.common.js) and uncomment **modules section** in **css-loader**. Then open (webpack.prod.js) and comment out **PurgeCSSPlugin** in the **plugins section**. Then in every component add the required import as follows: `import classes from './scss/requiredStyles'`
- Autoprefixer for CSS (it supports IE >= 11)
- Hot reloading for **JS** & **CSS** and **redux** store (in development)
- Prettier (for code format)
- Docker setup for development

## It has the following configuration for React:

- React router dom
- Redux & Redux thunk & & Redux logger & Redux devTool
- Prop types
- 2 environments {production: .env, development: .env.development}

## Prerequisites:

- nodeJS > 14.X.X or Docker

## Installing / Getting Started:

### Development (locally):

- Clone repo => `git clone git@github.com:react-custom-projects/webpack-react-boilerplate.git`
- `cd webpack-react-boilerplate`
- Install dependencies => `yarn install`
- Start the development server => `yarn start`

### Development (using Docker):

- Clone repo => `git clone git@github.com:react-custom-projects/webpack-react-boilerplate.git`
- `cd webpack-react-boilerplate`
- Install dependencies (required for prettier) => `yarn install`
- Start the development server => `docker-compose up --build`

## This boilerplate uses `enzyme`, `mocha` and `chai` for testing

**_Note:_** All test files should be in `/src/test/` with the name of `ComponentName.test.js`.

### Required packages for testing:

- `enzyme` => is a JavaScript Testing utility for React
- `@wojtekmaj/enzyme-adapter-react-17` => Unofficial adapter for React 17 for Enzyme.
- `mocha` => is a JavaScript test framework for Node.js programs, featuring browser support, asynchronous testing, test coverage reports, and use of any assertion library.
- `@babel/register` => uses Node's require() hook system to compile files on the fly when they are loaded.
- `ignore-styles` => a style hook to ignore style imports when running in Node.
- `chai` => is an assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- `chai-enzyme` => is a ***Chai.js*** assertions for ***enzyme***.
- `cheerio` => required by ***chai***.
- `nyc` => is an npm package for getting stats about the **test coverage** working hand to hand with `Mocha`.
- `@istanbuljs/nyc-config-babel` => Handy default configuration for instrumenting your babel-backed project with ***test coverage*** using `nyc` and `babel-plugin-istanbul`.
- `babel-plugin-istanbul` => A Babel plugin that instruments your code with `Istanbul coverage`. It can instantly be used with `karma-coverage` and `mocha` on Node.js (through `nyc`)
- `jsdom-global` => injects ***document***, ***window*** and other DOM API into your Node.js environment so that you can use them for testing.
- `jsdom` => required by ***jsdom-global***.
- `sinon` => used for mocking.
- `redux-mock-store` => A mock store for testing ***Redux*** async action creators and middleware.
- `chai-redux-mock-store` => A set of helpers to use with ***chaijs*** and ***redux-mock-store***.

### .mocharc.yml file:

- Imports all the required packages for mocha.
- Specifies the name of the setup file.
- Specifies which files should be tested.

### .nycrc file:

- Extends babel configurations to use `@istanbuljs/nyc-config-babel`
- Set `check-coverage` to true.
- Set lines percentage to `60%`.
- Creates 2 report types:

    1-  `html` => outputs the coverage results as `html` in the `/coverage` directory.

    2- `text` => outputs the coverage results as `text` in the `CLI`

## Update environment variables:

Please keep in mind that environment variables configured using webpack which means that you need to re-run the corresponding environment script (yarn start, yarn run build) if you update the environment file.

## Configuring Prettier

This build relies on [Prettier formatter](https://prettier.io/) to enforce a code style. And [ESLint](https://eslint.org/) for identifying problematic patterns found in JavaScript code.

- Setting up prettier:

  1- You can find steps on how to set up prettier formatter with WebStorm/PhpStorm [here](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher).

  Notes:

  - It's better to use the local `node_modules` version of prettier instead of a global one. This is to avoid version conflicts (in case the globally installed version does not match with the versions specified in `package.json`). So when setting up the file watcher when you follow the steps from the above link you can set `program` to `$ProjectFileDir$\node_modules\.bin\prettier` (warning this assumes that node_modules sits in the root of your project. This will need to change if your directory structure changes).
  - You will have to create two file watchers. One for JSX files and one for JS files. The webpack build tools are already configured to work with `eslint` and `prettier`. The only thing needed is the two file watchers.

  2- Follow the next steps to set up **prettier** and **eslint** on **_VS Code_**:

  - Install `prettier` plugin

  - Install `eslint` plugin

  - Open **_VS Code settings_** `CTRL + ,`:

    a- Search for `formatter` => check **Format on save**

    b- Search for `prettier` => add `.prettierrc` in **_Prettier: Config Path_** section && check **_Prettier: Require Config_**

  3- Please refer to other tutorials if you are using a different IDE.

## Site meta tags:

- This app includes facebook, twitter and regular meta tags

#### To update them:

- Open constants.js file and update metaInfo object
- Open src/assets/images and replace (favicon.png, metaImage.jpg) with your images but using the same name

## Extra:

- Private route guard => protect the given route based on a token.
- Restricted route guard => protect the given route based on a token, and a list of permissions (can be an array or a string).
- Restricted section => protect the given section based on a list of permissions (can be an array or a string).
- Generic error boundary fallback component (you can customize it)
- Cookies, local storage and sessions storage mangers to store data in the browser. (**Note:** the data encrypted using crypto-js package before storing it.)
- Basic mixins `(scss/generic/_mixins.scss)`
- Normalize styles `(scss/generic/_normalize.scss)`
- App typography styles `(scss/generic/_typography.scss)`
- 4 break points `(scss/generic/_variables.scss)`

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

It runs all unit test files in `/src/test` directory.

### `yarn test:watch`

- It runs all unit test files in `/src/test` directory using watch mode.
- Will run all your tests once then again on every change of your source code

### `yarn test:coverage`

It runs test coverage with `60%` which is set in `.nycrc` file.

### `yarn generate` **_component_** || **_container_** || **_page_** || **_hook_** || **_service_** || **_reducer_**

- It creates a boilerplate for component, container, page, custom hook, service or reducer.

**_Notes:_**
- On create component, container or page, it will ask you if css modules are enabled:
    - If yes => it creates a scss file on the same level of the (component || container || page) then add css modules import
    - If no => it creates a scss file in the scss directory (scss/components, scss/containers) in the corresponding directory then import the created scss file in the corresponding scss file (scss/_components, scss/_containers)
