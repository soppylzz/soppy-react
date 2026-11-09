<h1 align="center"><img width="60%" src="./assets/wordmark.svg" alt="soppy-react"/></h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6" alt="TypeScript" />
</p>

<div align="center">

[English](README.md) | [简体中文](README.zh-cn.md)

</div>

Soppy React 是一个通过手写小型 React 实现来学习 [React v18.2.0](https://github.com/facebook/react/tree/v18.2.0) 源码的仓库。目前已搭好开发与发布工具，下一阶段开始实现运行时。

## 安装

使用 Node.js 24 和 pnpm 11.18.0，在仓库根目录安装开发工具并运行检查：

```sh
pnpm install --frozen-lockfile
pnpm check
```

### CDN

项目尚未发布可通过 CDN 引入的浏览器产物。

## 包

私有工作区根包负责工程工具。[pnpm](./pnpm-workspace.yaml) 会识别后续放入 `packages/*` 的实现包。目前没有可发布的包。

添加实现包后，运行 `pnpm changeset` 记录变更，再用 `pnpm version-packages` 应用待处理的变更记录。根据 GitHub 提交和 PR 生成更新日志时，需要设置 `GITHUB_TOKEN`。发布前通过 `pnpm changeset publish-plan` 核对待发布包，然后使用具备 npm 发布权限的凭据运行 `pnpm release`。

## 许可证

[MIT](./LICENSE)。
