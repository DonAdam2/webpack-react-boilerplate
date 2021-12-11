const requireField = (fieldName) => {
	return (value) => {
		if (String(value).length === 0) {
			return fieldName + ' is required';
		}
		return true;
	};
};

module.exports = (plop) => {
	plop.setGenerator('component', {
		description: 'Create a component',
		// User input prompts provided as arguments to the template
		prompts: [
			{
				// Raw text input
				type: 'input',
				// Variable name for this input
				name: 'name',
				// Prompt to display on command line
				message: 'What is your component name?',
				// make user that component name is not empty
				validate: requireField('name'),
			},
		],
		actions: [
			{
				// Add a new file
				type: 'add',
				// Path for the new file
				path: 'src/js/components/{{pascalCase name}}/{{pascalCase name}}.js',
				// Handlebars template used to generate content of new file
				templateFile: 'generatorTemplates/component/Component.js.hbs',
			},
			{
				type: 'add',
				path: 'src/test/components/{{pascalCase name}}.test.js',
				templateFile: 'generatorTemplates/component/Component.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/components/{{pascalCase name}}/{{pascalCase name}}.scss',
				templateFile: 'generatorTemplates/component/Component.scss.hbs',
			},
		],
	});

	plop.setGenerator('page', {
		description: 'Create a page',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your page name?',
				validate: requireField('name'),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/js/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.js',
				templateFile: 'generatorTemplates/page/Page.js.hbs',
			},
			{
				type: 'add',
				path: 'src/test/containers/pages/{{pascalCase name}}Page.test.js',
				templateFile: 'generatorTemplates/page/Page.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/containers/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.scss',
				templateFile: 'generatorTemplates/component/Component.scss.hbs',
			},
		],
	});

	plop.setGenerator('container', {
		description: 'Create a container',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your container name?',
				validate: requireField('name'),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/js/containers/{{pascalCase name}}/{{pascalCase name}}.js',
				templateFile: 'generatorTemplates/component/Component.js.hbs',
			},
			{
				type: 'add',
				path: 'src/test/containers/{{pascalCase name}}.test.js',
				templateFile: 'generatorTemplates/Container.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/containers/{{pascalCase name}}/{{pascalCase name}}.scss',
				templateFile: 'generatorTemplates/component/Component.scss.hbs',
			},
		],
	});

	plop.setGenerator('hook', {
		description: 'Create a custom react hook',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your hook name?',
				validate: requireField('name'),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/js/customHooks/{{camelCase name}}.js',
				templateFile: 'generatorTemplates/hook.js.hbs',
			},
		],
	});

	plop.setGenerator('service', {
		description: 'Create a service',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your service name?',
				validate: requireField('name'),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/js/services/{{pascalCase name}}Service.js',
				templateFile: 'generatorTemplates/service/Service.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/services/HttpService.js',
				templateFile: 'generatorTemplates/service/HttpService.js.hbs',
				skipIfExists: true,
			},
		],
	});

	plop.setGenerator('reducer', {
		description: 'Create a reducer',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your reducer name?',
				validate: requireField('name'),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/js/store/{{camelCase name}}/actions/{{pascalCase name}}Actions.js',
				templateFile: 'generatorTemplates/reducer/Actions.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/store/{{camelCase name}}/reducers/{{pascalCase name}}Reducer.js',
				templateFile: 'generatorTemplates/reducer/Reducer.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/store/{{camelCase name}}/selectors/{{pascalCase name}}Selectors.js',
				templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/store/{{camelCase name}}/{{pascalCase name}}ActionTypes.js',
				templateFile: 'generatorTemplates/reducer/ActionTypes.js.hbs',
			},
			{
				type: 'append',
				path: 'src/js/store/rootReducer.js',
				pattern: `/* PLOP_INJECT_IMPORT */`,
				template: `import {{camelCase name}} from './{{camelCase name}}/reducers/{{pascalCase name}}Reducer';`,
			},
			{
				type: 'append',
				path: 'src/js/store/rootReducer.js',
				pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
				template: `{{camelCase name}},`,
			},
		],
	});
};
