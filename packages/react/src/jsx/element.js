import { hasOwn, REACT_ELEMENT_TYPE } from "@soppy-react/shared"

// React extracts these fields before copying attributes into props.
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
}

function hasValidRef(config) {
  // In development, React also checks the property descriptor to avoid invoking its warning getter.
  // if (__DEV__) {
  //   if (hasOwnProperty.call(config, 'ref')) {
  //     const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
  //     if (getter && getter.isReactWarning) {
  //       return false;
  //     }
  //   }
  // }
  return config.ref !== undefined
}

function hasValidKey(config) {
  return config.key !== undefined
}

/**
 * Mirrors the factory signature used by React 18.2.0.
 * @see {@link https://github.com/facebook/react/blob/v18.2.0/packages/react/src/jsx/ReactJSXElement.js#L128-L147 | Upstream ReactElement factory}
 * @see {@link https://github.com/soppylzz/soppy-react/blob/main/packages/react/src/jsx/element.js.md | Why use a function expression here?}
 */
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    // Origin: Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    // Light: unlike in Vue3, React VNodes store `children` as a prop.
    props: props,

    // Origin: Record the component responsible for creating this element.
    _owner: owner,
  }
  return element
}

/* ==================== core: Vnode creation method ==================== */
export function jsxDEV(type, config, maybeKey, source, self) {
  const props = {}

  let key = maybeKey === undefined ? null : String(maybeKey)
  let ref = null

  if (hasValidKey(config)) {
    key = String(config.key)
  }
  if (hasValidRef(config)) {
    ref = config.ref
  }

  for (const propName in config) {
    // Light: filter out inherited enumerable properties from the prototype chain and React's reserved props.

    // const proto = {}
    // Object.defineProperty(proto, "inherited", { enumerable: true })
    // const son = { "self-hoisted": undefined }
    // Object.setPrototypeOf(son, proto)

    // // only traverse self-hoisted attrs
    // console.log(Object.entries(son))
    // console.log(Object.keys(son))

    // // traverse via prototype chain
    // for (const key in son) { console.log(key) }

    if (hasOwn(config, propName) && !hasOwn(RESERVED_PROPS, propName)) {
      props[propName] = config[propName]
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    /* Owner tracking is not implemented yet. */ undefined,
    props
  )
}
