const {
  isCssModules,
  rootDirectory,
  publicDirectory,
  buildToolsDirectory,
} = require('./buildTools/constants');

const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
  };
};

const startsWithUseKeyWord = () => {
  return (value) => {
    if (String(value).startsWith('use')) {
      return true;
    }
    return 'Custom hooks should start with use keyword';
  };
};

const createQuestion = (type) => {
  const isReducer = type === 'reducer',
    isHook = type === 'hook';

  if (isReducer) {
    return [
      {
        type: 'input',
        name: 'reducerEntity',
        message: `What is your entity name (directory in store)?`,
        validate: requireField('reducerEntity'),
      },
      {
        type: 'input',
        name: 'name',
        message: `What is your ${type} name?`,
        validate: requireField('name'),
      },
    ];
  } else {
    return {
      // Raw text input
      type: 'input',
      // Variable name for this input
      name: 'name',
      // Prompt to display on command line
      message: `What is your ${type} name?`,
      // make sure that name is not empty
      validate: isHook ? requireField('name') && startsWithUseKeyWord() : requireField('name'),
    };
  }
};

const generateContainerOrPage = (isPage = false) => {
  let actionsList = [
    {
      type: 'add',
      path: `${rootDirectory}/js/containers${isPage ? '/pages' : ''}/{{camelCase name}}${
        isPage ? 'Page' : ''
      }/{{pascalCase name}}${isPage ? 'Page' : ''}.jsx`,
      templateFile: `generatorTemplates${isPage ? '/page/Page' : '/component/Component'}.js.hbs`,
      data: { isCssModules },
    },
    {
      type: 'add',
      path: `${rootDirectory}/js/containers${isPage ? '/pages' : ''}/{{camelCase name}}${
        isPage ? 'Page' : ''
      }/{{pascalCase name}}${isPage ? 'Page' : ''}.test.jsx`,
      templateFile: `generatorTemplates${
        isPage ? '/page/Page' : '/component/Component'
      }.test.js.hbs`,
    },
  ];

  if (isCssModules) {
    actionsList.push({
      type: 'add',
      path: `${rootDirectory}/js/containers${isPage ? '/pages' : ''}/{{camelCase name}}${
        isPage ? 'Page' : ''
      }/{{pascalCase name}}${isPage ? 'Page' : ''}.scss`,
      templateFile: 'generatorTemplates/component/Component.scss.hbs',
    });
  } else {
    actionsList.push(
      {
        type: 'add',
        path: `${rootDirectory}/scss/containers${isPage ? '/pages' : ''}/_{{dashCase name}}${
          isPage ? '-page' : ''
        }.scss`,
        templateFile: 'generatorTemplates/component/Component.scss.hbs',
      },
      {
        type: 'append',
        path: `${rootDirectory}/scss/_containers.scss`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `@import './containers${isPage ? '/pages' : ''}/{{dashCase name}}${
          isPage ? '-page' : ''
        }';`,
      }
    );
  }

  return actionsList;
};

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [createQuestion('component')],
    actions: function () {
      let actionsList = [
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: `${rootDirectory}/js/components/{{camelCase name}}/{{pascalCase name}}.jsx`,
          // Handlebars template used to generate content of new file
          templateFile: 'generatorTemplates/component/Component.js.hbs',
          data: { isCssModules },
        },
        {
          type: 'add',
          path: `${rootDirectory}/js/components/{{camelCase name}}/{{pascalCase name}}.test.jsx`,
          templateFile: 'generatorTemplates/component/Component.test.js.hbs',
        },
      ];

      if (isCssModules) {
        actionsList.push({
          type: 'add',
          path: `${rootDirectory}/js/components/{{camelCase name}}/{{pascalCase name}}.scss`,
          templateFile: 'generatorTemplates/component/Component.scss.hbs',
        });
      } else {
        actionsList.push(
          {
            type: 'add',
            path: `${rootDirectory}/scss/components/_{{dashCase name}}.scss`,
            templateFile: 'generatorTemplates/component/Component.scss.hbs',
          },
          {
            type: 'append',
            path: `${rootDirectory}/scss/_components.scss`,
            pattern: `/* PLOP_INJECT_IMPORT */`,
            template: `@import './components/{{dashCase name}}';`,
          }
        );
      }

      return actionsList;
    },
  });

  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [createQuestion('page')],
    actions: generateContainerOrPage(true),
  });

  plop.setGenerator('container', {
    description: 'Create a container',
    prompts: [createQuestion('container')],
    actions: generateContainerOrPage(),
  });

  plop.setGenerator('hook', {
    description: 'Create a custom react hook',
    prompts: [createQuestion('hook')],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/js/customHooks/{{camelCase name}}.js`,
        templateFile: 'generatorTemplates/hook.js.hbs',
      },
    ],
  });

  plop.setGenerator('service', {
    description: 'Create a service',
    prompts: [createQuestion('service')],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/js/services/{{pascalCase name}}Service.js`,
        templateFile: 'generatorTemplates/service/Service.js.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/js/services/HttpService.js`,
        templateFile: 'generatorTemplates/service/HttpService.js.hbs',
        skipIfExists: true,
      },
    ],
  });

  plop.setGenerator('reducer', {
    description: 'Create a reducer',
    prompts: createQuestion('reducer'),
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/js/store/{{camelCase reducerEntity}}/slices/{{pascalCase name}}Slice.js`,
        templateFile: 'generatorTemplates/reducer/Slice.js.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/js/store/{{camelCase reducerEntity}}/selectors/{{pascalCase name}}Selectors.js`,
        templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
      },
      {
        type: 'append',
        path: `${rootDirectory}/js/store/reduxSlices.js`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase reducerEntity}}/slices/{{pascalCase name}}Slice';`,
      },
      {
        type: 'append',
        path: `${rootDirectory}/js/store/reduxSlices.js`,
        pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
        template: `{{camelCase name}},`,
      },
    ],
  });
  const dontCacheBustURLsMatching = /\.[0-9a-f]{8}\./;
  // exclude = [/\.map$/, /asset-manifest\.json$/, /LICENSE/];

  plop.setGenerator('progressiveWebApp', {
    description: 'Add required files for progressive web app',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/serviceWorker/swSource.js`,
        templateFile: 'generatorTemplates/progressiveWebApp/swSource.js.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/serviceWorker/swRegistration.js`,
        templateFile: 'generatorTemplates/progressiveWebApp/swRegistration.js.hbs',
      },
      {
        type: 'add',
        path: `${publicDirectory}/manifest.json`,
        templateFile: 'generatorTemplates/progressiveWebApp/manifest.json.hbs',
      },
      {
        type: 'append',
        path: `${publicDirectory}/index.html`,
        pattern: `<!-- PLOP_INJECT_PWA_META-->`,
        template: `<link rel="manifest" href="manifest.json" />
            <meta name="theme-color" content="#ffffff" />
            <link
              rel="apple-touch-icon"
              href="<%= htmlWebpackPlugin.options.meta.url %><%= require('./assets/images/pwa/icon-192x192.png') %>"
            />`,
      },
      {
        type: 'append',
        path: `${rootDirectory}/index.jsx`,
        pattern: `/* PLOP_INJECT_PWA_IMPORTS */`,
        template: `import registerServiceWorker from './serviceWorker/swRegistration';`,
      },
      {
        type: 'append',
        path: `${rootDirectory}/index.jsx`,
        pattern: `/* PLOP_INJECT_PWA_REGISTERER */`,
        template: `registerServiceWorker();`,
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_IMPORTS */`,
        template: `{ InjectManifest } = require('workbox-webpack-plugin'),
        CopyPlugin = require('copy-webpack-plugin'),`,
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_PLUGINS */`,
        template: `new CopyPlugin({
        patterns: [
          { from: 'public/manifest.json', to: '' },
          { from: 'public/assets/images/pwa', to: 'assets/images/pwa' },
        ],
        }),
        new InjectManifest({
          //this is the source of your service worker setup
          swSrc: \`\${PATHS.src}/serviceWorker/swSource\`,
          dontCacheBustURLsMatching: ${dontCacheBustURLsMatching},         
          // Bump up the default maximum size (2mb) to (5mb) that's precached,
          // to make lazy-loading failure scenarios less likely.
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          //this is the output name of your service worker file
          swDest: 'serviceWorker.js',
        }),`,
      },
    ],
  });
};
