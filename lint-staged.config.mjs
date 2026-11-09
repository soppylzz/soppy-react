export default {
  "*.{js,mjs,cjs,jsx,ts,tsx,mts,cts,json,jsonc,md,markdown}": [
    "eslint --fix --max-warnings 0 --no-warn-ignored",
    "prettier --write --ignore-unknown",
  ],
  "*.{yaml,yml,css,scss,mdx,html}": "prettier --write --ignore-unknown",
}
