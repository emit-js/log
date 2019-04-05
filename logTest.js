/* eslint-env jest */

var emit,
  log = require("./log")

beforeEach(function() {
  emit = require("@emit-js/emit")()
  log(emit)
})

test("log", function() {
  emit("log", "debug")
  emit("log", "error", "p1")
  emit("log", "info", "p1", "p2", "hi")
  emit("log", "trace", "test", {
    event: "event",
    message: "hi",
  })
  emit("log", "warn", "hi")
  emit("anything")
  emit()
})
