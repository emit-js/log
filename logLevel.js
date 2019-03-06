/*prettier-ignore*/
"use strict";

module.exports = function(dot) {
  if (dot.logLevel) {
    return
  }

  dot.any("logLevel", logLevel)
}

function logLevel(prop, arg, dot) {
  var state = dot.state.log

  if (prop.length) {
    state.events[prop[0]] = Object.assign(
      state.events[prop[0]],
      arg
    )
  } else {
    state.level = arg
  }
}
