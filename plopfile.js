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
				templateFile: 'generatorTemplates/Component/Component.js.hbs',
			},
			{
				type: 'add',
				path: 'src/test/components/{{pascalCase name}}.test.js',
				templateFile: 'generatorTemplates/Component/Component.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/components/{{pascalCase name}}/{{pascalCase name}}.scss',
				templateFile: 'generatorTemplates/Component/Component.scss.hbs',
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
				path: 'src/js/containers/pages/{{pascalCase name}}/{{pascalCase name}}.js',
				templateFile: 'generatorTemplates/Component/Component.js.hbs',
			},
			{
				type: 'add',
				path: 'src/test/containers/pages/{{pascalCase name}}.test.js',
				templateFile: 'generatorTemplates/Page.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/containers/pages/{{pascalCase name}}/{{pascalCase name}}.scss',
				templateFile: 'generatorTemplates/Component/Component.scss.hbs',
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
				templateFile: 'generatorTemplates/Component/Component.js.hbs',
			},
			{
				type: 'add',
				path: 'src/test/containers/{{pascalCase name}}.test.js',
				templateFile: 'generatorTemplates/Container.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/containers/{{pascalCase name}}/{{pascalCase name}}.scss',
				templateFile: 'generatorTemplates/Component/Component.scss.hbs',
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
};
