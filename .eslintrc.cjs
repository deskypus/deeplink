require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    overrides: [
        {
            files: ["*.vue"],
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
            rules: {
                "no-unused-vars": "off",
                "no-undef": "off",
            },
        },
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "linebreak-style": "off",
        "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    },
};
