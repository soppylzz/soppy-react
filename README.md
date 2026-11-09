<h1 align="center"><img width="60%" src="./assets/wordmark.svg" alt="soppy-react"/></h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6" alt="TypeScript" />
</p>

<div align="center">

[English](README.md) | [简体中文](README.zh-cn.md)

</div>

Soppy React is a workspace for writing a small React implementation while studying [React v18.2.0](https://github.com/facebook/react/tree/v18.2.0). The development and release tools are in place. The runtime implementation is the next stage.

## Installation

Use Node.js 24 and pnpm 11.18.0. From the repository root, install the development tools and run the checks:

```sh
pnpm install --frozen-lockfile
pnpm check
```

### CDN

The project has no published browser bundle yet.

## Packages

The private workspace root owns tooling. [pnpm](./pnpm-workspace.yaml) discovers packages under `packages/*` as implementations are added. There are currently no publishable packages.

Once a package exists, run `pnpm changeset` to record a change and `pnpm version-packages` to apply pending changesets. Set `GITHUB_TOKEN` when generating changelog entries from GitHub commits and pull requests. Review `pnpm changeset publish-plan` before running `pnpm release` with npm credentials.

## License

[MIT](./LICENSE).
