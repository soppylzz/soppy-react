const element = <button type="button">Hello, Soppy React!</button>

document.querySelector("#element").textContent = JSON.stringify(
  element,
  (_, value) => (typeof value === "symbol" ? String(value) : value),
  2
)

export {}
