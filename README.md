## This webpack (V5.72.0) boilerplate supports the following:

- Testing using **jest**, **react-testing-library**
- **SCSS** preprocessor
- To enable **CSS modules** (each component has its own styles "no conflict between different components styles") => just open `/buildTools/constants.js` and set **isCssModules** to **true**. Then in every component add the required import as follows: `import classes from './scss/requiredStyles'`
- Autoprefixer for CSS (it supports IE >= 11)
- Hot reloading for **JS** & **CSS** and **redux** store (in development)
- Prettier (for code format)
- Docker setup for development

## It has the following configuration for React:

- React router dom
- Redux & Redux thunk & & Redux logger & Redux devTool
- Prop types
- 2 environments {production: .env, development: .env.development}

## It has the following mocks for Jest:

- MockProvider => for mocking redux provider
- MockReactIntlProvider => for mocking react-intl provider (if you are using it you need to download it)
- MockRouter => for mocking react router
- OverrideRenderOfRTL => overrides the render method of RTL with all providers

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

It runs all test files.

### `yarn test:watch`

- It runs all unit test files in `/src` directory using watch mode.
- Will run all your tests once then again on every change of your source code

### `yarn test:coverage`

It runs test coverage.

### `yarn test:clear`

Clears test cache.

### `yarn generate` **_component_** || **_container_** || **_page_** || **_hook_** || **_service_** || **_reducer_**

- It creates a boilerplate for component, container, page, custom hook, service or reducer.
