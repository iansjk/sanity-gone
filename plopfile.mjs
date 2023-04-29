export default function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator("react-component", {
    description: "Generate a new React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What's the name of the new component? (e.g. 'MyComponent')",
      },
      {
        type: "input",
        name: "path",
        message: "What subdirectory? (leave blank to place in src/components)",
      },
    ],
    actions: [
      {
        type: "addMany",
        templateFiles: ["plop-templates/Component/*.hbs"],
        base: "plop-templates/Component",
        destination: "src/components/{{ path }}/{{ pascalCase name }}",
      },
    ],
  });
}
