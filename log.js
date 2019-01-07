/*prettier-ignore*/
"use strict";

var levelEmojis = {
  debug: "🐛",
  error: "🛑",
  info: "ℹ️ ",
  trace: "💻",
  warn: "⚠️ ",
}

var levels = Object.keys(levelEmojis)

module.exports = function log(dot, opts) {
  opts = opts || {}

  if (dot("get.log")) {
    return dot
  }

  dot("set.log", opts)

  dot.onAny("before", logAll)
  dot.onAny("log", logger)

  return dot
}

function logAll(o) {
  var dot = o.dot,
    ns = o.ns,
    opts = o.opts,
    prop = o.prop

  if (ns === "log") {
    return
  }

  dot("log", prop, { message: opts, ns: ns })
}

function logger(o) {
  var level = "info",
    opts = o.opts || {},
    props = o.props

  if (levels.indexOf(o.props[0]) > -1) {
    level = o.props[0]
    props = o.props.slice(1)
  }

  var message = opts.message || opts

  var out = [new Date().toISOString(), levelEmojis[level]]

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
