# @emit-js/log

[emit](https://github.com/emit-js/emit#readme) logger

![log](log.gif)

## Install

```bash
npm install @emit-js/emit @emit-js/log
```

## Setup

```js
const emit = require("@emit-js/emit")()
require("@emit-js/log")(emit)
```

This creates the `emit.log` emitter.

## Log levels

There are five log levels: `debug`, `trace`, `info`, `warn`, and `error`.

By default, the logger only logs `warn` or above, but you can change that with `logLevel`:

```js
emit("logLevel", "debug")
```

You could also set the environment variable `LOG=debug`.

## Logs all events

By default, the logger logs all events at log level `debug`.

You might want to change `debug` logs to `info` for certain events:

```js
emit("logLevel", "myEvent", { debug: "info" })
```

## Manual logging

```js
emit.log("warn", "warning!")
```
