import globals from globals;
import playwright from 'eslint-plugin-playwight';

export default [
    {files:["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: {globals: globals.browser}},
    {
        ...playwright.config['flat/recommended']
    },
];