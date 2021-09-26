module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    endOfLine: "auto",
    printWidth: 120,
    jsxBracketSameLine: true,
    overrides: [
        {
            files: "*.yml",
            options: {
                tabWidth: 2,
            },
        },
    ],
};
