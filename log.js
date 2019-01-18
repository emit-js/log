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
  if (dot.state.log) {
    return
  }

  opts = opts || {}
  dot.state.log = opts

  dot.beforeAny(logAll)
  dot.any("log", logger)
}

function logAll(prop, arg, dot, event) {
  if (event === "log") {
    return
  }

  dot("log", prop, { event: event, message: arg })
}

function logger(prop, arg, dot, e) {
  var level = "info"

  if (levels.indexOf(prop[0]) > -1) {
    level = prop[0]
    prop = prop.slice(1)
  }

  var message = arg.message || arg
  var event = arg.event || e

  var out = [new Date().toISOString(), levelEmojis[level]]

  if (event) {
    out.push(event)
  }

  if (prop.length) {
    out.push(prop.join("."))
  }

  if (message) {
    out.push(message)
  }

  // eslint-disable-next-line no-console
  console.log.apply(null, out)
}
