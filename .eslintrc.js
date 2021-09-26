module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "linebreak-style": "off",
        "no-unused-vars": [
            "error",
            { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],
    },
};
