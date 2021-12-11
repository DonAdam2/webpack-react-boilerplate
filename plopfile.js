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
				path: 'src/js/components/{{pascalCase name}}/{{pascalCase name}}.test.js',
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
		// User input prompts provided as arguments to the template
		prompts: [
			{
				// Raw text input
				type: 'input',
				// Variable name for this input
				name: 'name',
				// Prompt to display on command line
				message: 'What is your page name?',
			},
		],
		actions: [
			{
				// Add a new file
				type: 'add',
				// Path for the new file
				path: 'src/js/containers/pages/{{pascalCase name}}/{{pascalCase name}}.js',
				// Handlebars template used to generate content of new file
				templateFile: 'generatorTemplates/Component/Component.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/containers/pages/{{pascalCase name}}/{{pascalCase name}}.test.js',
				templateFile: 'generatorTemplates/Component/Component.test.js.hbs',
			},
			{
				type: 'add',
				path: 'src/js/containers/pages/{{pascalCase name}}/{{pascalCase name}}.scss',
				templateFile: 'generatorTemplates/Component/Component.scss.hbs',
			},
		],
	});
};
