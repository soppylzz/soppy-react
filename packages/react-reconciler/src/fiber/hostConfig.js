// This renderer supports HTML attributes, inline styles, and direct DOM listeners.
export function updateProperties(node, previous, next) {
  for (const name of new Set([...Object.keys(previous), ...Object.keys(next)])) {
    const value = next[name]
    const old = previous[name]
    if (name === "children" || old === value) continue
    if (name === "style") {
      for (const key of Object.keys(old ?? {})) {
        if (value?.[key] == null) node.style[key] = ""
      }
      Object.assign(node.style, value)
    } else if (/^on[A-Z]/.test(name)) {
      const event = name.slice(2).toLowerCase()
      if (old) node.removeEventListener(event, old)
      if (value) node.addEventListener(event, value)
    } else {
      const attribute = name === "className" ? "class" : name
      if (value == null || value === false) node.removeAttribute(attribute)
      else node.setAttribute(attribute, value === true ? "" : value)
    }
  }
}
