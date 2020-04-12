## This webpack (V4.41.2) boilerplate supports the following:

- SCSS preprocessor
- To enable CSS modules (each component has it's own styles "no conflict between different components styles") => just open (webpack.prod.js && webpack.dev.js) and uncomment modules: true. Then in every component add the required import as follow: import classes from './scss/requiredStyles'
- Autoprefixer for CSS (it supports IE >= 11)
- Hot reloading for **JS** (**_Note:_** if you add anything in the **constructor**
  or **componentDidMount** you need to refresh the page because hot loader
  will not pick it up) & **CSS** and **redux** store (in development)
- Prettier (for code format)

## It has the following configuration for React:

- React router dom
- Redux & Redux devTool
- Prop types

## Configuring Prettier

This build relies on [Prettier formatter](https://prettier.io/) to enforce a code style. You can find steps on how to setup prettier formatter with WebStorm/PhpStorm [here](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher). Please refer to other tutorials if you are using a different IDE.

Notes:

- It's better to use the local `node_modules` version of prettier instead of a global one. This is to avoid version conflicts (in case the globally installed version does not match with the versions specified in `package.json`). So when setting up the file watcher when you follow the steps from the above link you can set `program` to `$ProjectFileDir$\node_modules\.bin\prettier` (warning this assumes that node_modules sits in the root of your project. This will need to change if your directory structure changes).
- You will have to create two file watchers. One for JSX files and one for JS files. The webpack build tools are already configured to work with `eslint` and `prettier`. The only thing needed is the two file watchers.

## Site meta tags:

- This app includes facebook, twitter and regular meta tags

#### To update them:

- Open constants.js file and update metaInfo object
- Open src/assets/images and replace (favicon.png, metaImage.jpg) with your images but using the same name

## Extra:

- Private route guard
- Font awesome
- Layout using bootstrap grid system (scss/generic/\_grid.scss)
- Basic mixins (scss/generic/\_mixins.scss)
- Normalize styles (scss/generic/\_normalize.scss)
- App typography styles (scss/generic/\_typography.scss)
- 4 break points (scss/generic/\_variables.scss)

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

### `yarn run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

**_Note:_** You can install live-server globally (npm install -g live-server) which allows your to check your application in production by navigating to dist directory then use the following command:
`live-server --port=8080 --entry-file=./index.html`

By using live-server you can check your app in production without any need for xampp, wamp or any similar web server.

### `yarn run analyze-bundle`

It allows you to analyze the bundle size.<br>
