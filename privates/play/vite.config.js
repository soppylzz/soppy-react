import { resolve } from "node:path"
import { workspaceAliases } from "@soppy-react/build"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: { alias: workspaceAliases(resolve(import.meta.dirname, "../../packages")) },
  optimizeDeps: { noDiscovery: true },

  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "@soppy-react/react",
      // The playground exercises the development factory in both dev and preview.
      development: true,
    },
  },
})
