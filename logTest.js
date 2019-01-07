/* eslint-env jest */

var dot = require("dot-event")(),
  log = require("./log"),
  store = require("@dot-event/store")

beforeEach(function() {
  dot.reset()
  store(dot)
  log(dot)
})

test("log", function() {
  dot("log.debug")
  dot("log.error", "test")
  dot("log.info", "test", "hi")
  dot("log.trace", "test", { message: "hi", ns: "ns" })
  dot("log.warn", "test", "hi")
})
