This webpack (V4.30.0) boilerplate supports the following:
- SCSS preprocessor
- CSS modules (each component has it's own styles "no conflict between different components styles")
- Autoprefixer for CSS (it supports IE >= 11)
- Hot reloading for **JS** (***Note:*** if you add anything in the **constructor**
 or **componentDidMount** you need to refresh the page because hot loader
  will not pick it up) & **CSS** and **redux** store (in development)
- Prettier (for code format)

It has the following configuration for React:
- React router dom
- Redux & Redux devTool
- Prop types

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
It will open [http://localhost:3000](http://localhost:3000) automatically in the browser to see your app.

All changes will be injected automatically without reloading the page.<br>

You will see in the console the following:
- All redux store related changes
- Any of the following errors:
    1. Linting errors.
    2. Code format errors (because of [prettier](https://prettier.io/))

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

***Note:*** http-server is part of package.json which you can use to check your application in production by using the following command:
`http-server dist -o -c-1`

By using http-server you can check your app in production without any need for xampp, wamp or any similar web server.

### `npm run analyze-bundle`

It allows you to analyze the bundle size.<br>
