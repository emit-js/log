/*prettier-ignore*/
"use strict";

module.exports = function(emit) {
  if (emit.logLevel) {
    return
  }

  emit.any("logLevel", logLevel)
}

function logLevel(arg, prop, emit) {
  var state = emit.state.log

  if (prop.length) {
    state.events[prop[0]] = Object.assign(
      {},
      state.events[prop[0]],
      arg
    )
  } else {
    state.level = arg
  }
}
