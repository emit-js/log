/*prettier-ignore*/
"use strict";

module.exports = function log(dot, opts) {
  opts = opts || {}

  if (dot("get.log")) {
    return dot
  }

  dot("set.log", opts)
  dot.onAny("log", logger)

  return dot
}

function logger(o) {
  var level = o.props[0],
    opts = o.opts || {},
    props = o.props.slice(1)

  var message = opts.message || opts

  var out = [new Date().toISOString()]

  // prettier-ignore
  out.push(
    level === "debug" ?
      "🐛" :
      level === "error" ?
        "🛑" :
        level === "info"
          ? "ℹ️ "
          : level === "trace"
            ? "💻"
            : level === "warn"
              ? "⚠️ "
              : ""
  )

  if (opts.ns) {
    out.push(opts.ns)
  }

  if (props.length) {
    out.push(props.join("."))
  }

  if (message) {
    out.push(JSON.stringify(message))
  }

  // eslint-disable-next-line no-console
  console.log.apply(null, out)
}
