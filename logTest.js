/* eslint-env jest */

var emit,
  log = require("./log")

beforeEach(function() {
  emit = require("@emit-js/emit")()
  log(emit)
})

test("log", function() {
  emit("log", "debug")
  emit("log", "error", "test")
  emit("log", "info", "test", "hi")
  emit("log", "trace", "test", {
    event: "event",
    message: "hi",
  })
  emit("log", "warn", "test", "hi")
  emit("anything")
})
