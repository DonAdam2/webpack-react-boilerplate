const fs = require('fs');
const path = require('path');

const { isCssModules, rootDirectory, buildToolsDirectory } = require('./buildTools/constants');

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

const generatePage = () => {
  let actionsList = [
    {
      type: 'add',
      path: `${rootDirectory}/pages/{{camelCase name}}Page/{{pascalCase name}}Page.jsx`,
      templateFile: 'generatorTemplates/page/Page.js.hbs',
      data: { isCssModules },
    },
    {
      type: 'add',
      path: `${rootDirectory}/pages/{{camelCase name}}Page/{{pascalCase name}}Page.test.jsx`,
      templateFile: `generatorTemplates/page/Page.test.js.hbs`,
    },
  ];

  if (isCssModules) {
    actionsList.push({
      type: 'add',
      path: `${rootDirectory}/pages/{{camelCase name}}Page/{{pascalCase name}}Page.scss`,
      templateFile: 'generatorTemplates/component/Component.scss.hbs',
    });
  } else {
    actionsList.push(
      {
        type: 'add',
        path: `${rootDirectory}/scss/pages/_{{dashCase name}}-page.scss`,
        templateFile: 'generatorTemplates/component/Component.scss.hbs',
      },
      {
        type: 'append',
        path: `${rootDirectory}/scss/_pages.scss`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `@use './pages/{{dashCase name}}-page';`,
      }
    );
  }

  return actionsList;
};

module.exports = async (plop) => {
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
          path: `${rootDirectory}/components/{{camelCase name}}/{{pascalCase name}}.jsx`,
          // Handlebars template used to generate content of new file
          templateFile: 'generatorTemplates/component/Component.js.hbs',
          data: { isCssModules },
        },
        {
          type: 'add',
          path: `${rootDirectory}/components/{{camelCase name}}/{{pascalCase name}}.test.jsx`,
          templateFile: 'generatorTemplates/component/Component.test.js.hbs',
        },
      ];

      if (isCssModules) {
        actionsList.push({
          type: 'add',
          path: `${rootDirectory}/components/{{camelCase name}}/{{pascalCase name}}.scss`,
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
            template: `@use './components/{{dashCase name}}';`,
          }
        );
      }

      return actionsList;
    },
  });

  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [createQuestion('page')],
    actions: generatePage(),
  });

  plop.setGenerator('hook', {
    description: 'Create a custom react hook',
    prompts: [createQuestion('hook')],
    actions: [
      {
        type: 'add',
        path: `${rootDirectory}/hooks/{{camelCase name}}.js`,
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
        path: `${rootDirectory}/services/{{pascalCase name}}Service.js`,
        templateFile: 'generatorTemplates/service/Service.js.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/services/HttpService.js`,
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
        path: `${rootDirectory}/store/{{camelCase reducerEntity}}/slices/{{pascalCase name}}Slice.js`,
        templateFile: 'generatorTemplates/reducer/Slice.js.hbs',
      },
      {
        type: 'add',
        path: `${rootDirectory}/store/{{camelCase reducerEntity}}/selectors/{{pascalCase name}}Selectors.js`,
        templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
      },
      {
        type: 'append',
        path: `${rootDirectory}/store/reduxSlices.js`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase reducerEntity}}/slices/{{pascalCase name}}Slice';`,
      },
      {
        type: 'append',
        path: `${rootDirectory}/store/reduxSlices.js`,
        pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
        template: `  {{camelCase name}},`,
      },
    ],
  });
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
        path: 'eslint.config.js',
        pattern: `/* PLOP_INJECT_PWA_ESLINT_CONFIG */`,
        template: `  // Service worker files
  {
    files: ['**/serviceWorker/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },`,
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_IMPORTS */`,
        template: `{ InjectManifest } = require('workbox-webpack-plugin'),
                   WebpackPwaManifest = require('webpack-pwa-manifest'),`,
      },
      {
        type: 'append',
        path: `${buildToolsDirectory}/webpack.prod.js`,
        pattern: `/* PLOP_INJECT_PWA_PATH_IMPORTS */`,
        template: 'swSourcePath, swIconPath',
      },
      function () {
        const filePath = `${buildToolsDirectory}/webpack.prod.js`;
        const templateContent = fs.readFileSync(
          path.resolve(__dirname, 'generatorTemplates/progressiveWebApp/pwaPlugins.hbs'),
          'utf8'
        );
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const marker = '/* PLOP_INJECT_PWA_PLUGINS */';
        const newContent = fileContent.replace(marker, marker + '\n' + templateContent);
        fs.writeFileSync(filePath, newContent, 'utf8');
        return `_+ ${filePath}`;
      },
    ],
  });
};
