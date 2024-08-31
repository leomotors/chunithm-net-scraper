// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @satisfies {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig}
 */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[.][.]",
    "",
    "^[.]",
  ],
};

export default config;
