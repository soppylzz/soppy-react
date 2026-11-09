import { globSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { defineConfig } from "vite"

function readManifest(root) {
  return JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"))
}

// Public entries use src/index.js for the root and <subpath>.js for subpath exports.
function sourceEntries(root, manifest) {
  return Object.keys(manifest.exports).map((key) => {
    const entry = key === "." ? "index" : key.slice(2)
    const source = resolve(root, key === "." ? "src/index.js" : entry + ".js")
    return { entry, source, specifier: manifest.name + key.slice(1) }
  })
}

export function workspaceAliases(packagesDir) {
  return globSync("*/package.json", { cwd: packagesDir }).flatMap((file) => {
    const root = resolve(packagesDir, dirname(file))
    return sourceEntries(root, readManifest(root)).map(({ specifier, source }) => ({
      find: new RegExp(`^${RegExp.escape(specifier)}$`),
      replacement: source,
    }))
  })
}

export function libraryConfig(root) {
  const manifest = readManifest(root)
  const entries = sourceEntries(root, manifest)
  const dependencies = [
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
  ]

  return defineConfig(({ command, mode }) => {
    const development = command === "serve" || mode === "development"
    return {
      root,
      resolve: { alias: development ? workspaceAliases(resolve(root, "..")) : [] },
      build: {
        lib: {
          entry: Object.fromEntries(entries.map(({ entry, source }) => [entry, source])),
          formats: ["es", "cjs"],
          fileName: (format, entryName) => entryName + (format === "es" ? ".js" : ".cjs"),
        },
        rolldownOptions: {
          external: (id) => {
            if (development && id.startsWith("@soppy-react/")) return false
            return dependencies.some((name) => id === name || id.startsWith(name + "/"))
          },
        },
        minify: false,
        sourcemap: true,
      },
    }
  })
}
