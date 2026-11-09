# Tooling maintenance

Use the pnpm version in package.json and keep pnpm-lock.yaml in sync with dependency changes. Compare affected extensions in ESLint, Prettier, and lint-staged when adding a new file type. Run ESLint before Prettier for staged files that use both.

For hook changes, exercise the installed hooks in a disposable Git repository. Check that a staged formatting issue is fixed, a lint error blocks the commit, and commit-msg accepts a valid Conventional Commit and rejects an invalid subject line. Preserve the working repository's index.
