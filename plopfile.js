const { isCssModules, rootDirectory } = require('./buildTools/constants');

const requireField = (fieldName) => {
	return (value) => {
		if (String(value).length === 0) {
			return fieldName + ' is required';
		}
		return true;
	};
};

const createQuestion = (type, isReducer) => {
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
			validate: requireField('name'),
		};
	}
};

module.exports = (plop) => {
	plop.setGenerator('component', {
		description: 'Create a component',
		// User input prompts provided as arguments to the template
		prompts: [createQuestion('component')],
		actions: function (data) {
			let actionsList = [
				{
					// Add a new file
					type: 'add',
					// Path for the new file
					path: `${rootDirectory}/js/components/{{pascalCase name}}/{{pascalCase name}}.jsx`,
					// Handlebars template used to generate content of new file
					templateFile: 'generatorTemplates/component/Component.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/js/components/{{pascalCase name}}/{{pascalCase name}}.test.js`,
					templateFile: 'generatorTemplates/component/Component.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push({
					type: 'add',
					path: `${rootDirectory}/js/components/{{pascalCase name}}/{{pascalCase name}}.scss`,
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
						template: `@import 'components/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('page', {
		description: 'Create a page',
		prompts: [createQuestion('page')],
		actions: function (data) {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/js/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.jsx`,
					templateFile: 'generatorTemplates/page/Page.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/js/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.test.js`,
					templateFile: 'generatorTemplates/page/Page.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push({
					type: 'add',
					path: `${rootDirectory}/js/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.scss`,
					templateFile: 'generatorTemplates/component/Component.scss.hbs',
				});
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/containers/pages/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_containers.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'containers/pages/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('container', {
		description: 'Create a container',
		prompts: [createQuestion('container')],
		actions: function (data) {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/js/containers/{{pascalCase name}}/{{pascalCase name}}.jsx`,
					templateFile: 'generatorTemplates/component/Component.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/js/containers/{{pascalCase name}}/{{pascalCase name}}.test.js`,
					templateFile: 'generatorTemplates/component/Component.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push({
					type: 'add',
					path: `${rootDirectory}/js/containers/{{pascalCase name}}/{{pascalCase name}}.scss`,
					templateFile: 'generatorTemplates/component/Component.scss.hbs',
				});
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/containers/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_containers.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'containers/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
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
		prompts: createQuestion('reducer', true),
		actions: [
			{
				type: 'add',
				path: `${rootDirectory}/js/store/{{camelCase reducerEntity}}/actions/{{pascalCase name}}Actions.js`,
				templateFile: 'generatorTemplates/reducer/Actions.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/js/store/{{camelCase reducerEntity}}/reducers/{{pascalCase name}}Reducer.js`,
				templateFile: 'generatorTemplates/reducer/Reducer.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/js/store/{{camelCase reducerEntity}}/selectors/{{pascalCase name}}Selectors.js`,
				templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/js/store/{{camelCase reducerEntity}}/{{pascalCase name}}ActionTypes.js`,
				templateFile: 'generatorTemplates/reducer/ActionTypes.js.hbs',
			},
			{
				type: 'append',
				path: `${rootDirectory}/js/store/rootReducer.js`,
				pattern: `/* PLOP_INJECT_IMPORT */`,
				template: `import {{camelCase name}} from './{{camelCase reducerEntity}}/reducers/{{pascalCase name}}Reducer';`,
			},
			{
				type: 'append',
				path: `${rootDirectory}/js/store/rootReducer.js`,
				pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
				template: `{{camelCase name}},`,
			},
		],
	});
};
